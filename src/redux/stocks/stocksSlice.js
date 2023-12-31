import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  stocks: null,
  stockDetail: null,
  isLoading: true,
  stockDetailError: null,
  loadingDetail: true,
  searchTerm: '',
};

const apiKey = 'fecdf9f28fa76d319c6c49812079eea9';

export const getStocks = createAsyncThunk('stocks/getStock', async () => {
  try {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/stock-screener?limit=100&exchange=nyse,nasdaq,amex&priceMoreThan=100&marketCapLowerThan=5357210641370&isActivelyTrading=true&apikey=${apiKey}`);
    const output = response.json();
    return output;
  } catch (error) {
    console.error('Error fetching data');
    throw error;
  }
});

export const getStockDetail = createAsyncThunk('stockDetail/getStockDetail', async (symbol) => {
  try {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`);
    const output = response.json();
    return output;
  } catch (error) {
    console.error('Error fetching data');
    throw error;
  }
});

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: {
    [getStocks.pending]: (state) => {
      state.isLoading = true;
    },
    [getStocks.fulfilled]: (state, action) => {
      state.isLoading = false;
      const stockList = action.payload;
      const uniqueStocks = stockList.reduce((accumulator, currentStock) => {
        const existingStock = accumulator.find((stock) => (
          stock.companyName === currentStock.companyName
        ));
        if (!existingStock && currentStock.country) {
          accumulator.push(currentStock);
        }
        return accumulator;
      }, []);
      state.stocks = uniqueStocks;
    },
    [getStocks.rejected]: (state) => {
      state.isLoading = false;
    },
    [getStockDetail.pending]: (state) => {
      state.loadingDetail = true;
    },
    [getStockDetail.fulfilled]: (state, action) => {
      const stock = action.payload;
      const {
        companyName,
        mktCap,
        price,
        volAvg,
        image,
        sector,
        ceo,
        website,
      } = stock[0];
      const details = {
        companyName,
        image,
        mktCap,
        price,
        volAvg,
        sector,
        ceo,
        website,
      };
      state.stockDetail = details;
      state.loadingDetail = false;
    },
    [getStockDetail.rejected]: (state) => {
      state.stockDetailError = 'Error loading data, please reload';
      state.loadingDetail = false;
    },
  },
});

export const { setSearchTerm } = stocksSlice.actions;
export default stocksSlice.reducer;

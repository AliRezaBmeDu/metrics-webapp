import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  stocks: null,
  stockDetail: null,
  isLoading: true,
  stockDetailError: null,
  loadingDetail: true,
};

const apiKey = 'fecdf9f28fa76d319c6c49812079eea9';

export const getStocks = createAsyncThunk('stocks/getStock', async () => {
  try {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/stock-screener?limit=20&exchange=nyse,nasdaq,amex&priceMoreThan=100&marketCapLowerThan=5357210641370&isActivelyTrading=true&apikey=${apiKey}`);
    const output = response.json();
    console.log(output);
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
    console.log('Is this printing?', output);
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

  },
  extraReducers: {
    [getStocks.pending]: (state) => {
      state.isLoading = true;
    },
    [getStocks.fulfilled]: (state, action) => {
      state.isLoading = false;
      const stockList = action.payload;
      state.stocks = stockList;
    },
    [getStocks.rejected]: (state) => {
      state.isLoading = false;
    },
    [getStockDetail.pending]: (state) => {
      state.loadingDetail = true;
    },
    [getStockDetail.fulfilled]: (state, action) => {
      const stock = action.payload;
      console.log('The stock detail: ', stock);
      const {
        companyName, symbol, description, mktCap, image, price,
      } = stock[0];
      const details = {
        name: companyName,
        symbol,
        description,
        mktCap,
        image,
        price,
      };
      console.log('Details to be displayed', details);
      state.stockDetail = details;
      state.loadingDetail = false;
    },
    [getStockDetail.rejected]: (state) => {
      state.stockDetailError = 'Error loading data, please reload';
      state.loadingDetail = false;
    },
  },
});

export default stocksSlice.reducer;

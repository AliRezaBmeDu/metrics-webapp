import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  stocks: null,
  stockDetail: null,
  isLoading: true,
  stockDetailError: null,
  loadingDetail: true,
};

const apiKey = 'd20b102fb7428e9fefc8a86fd6651a7c';

export const getStocks = createAsyncThunk('stocks/getStock', async () => {
  try {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/stock-screener?limit=20&exchange=nyse,nasdaq,amex&priceMoreThan=100&marketCapLowerThan=5357210641370&isActivelyTrading=true&apikey=${apiKey}`);
    const output = response.json();
    return output;
  } catch (error) {
    console.error('Error fetching data');
    throw error;
  }
});

export const getStockDetail = createAsyncThunk('stocks/details/getStockDetail', async (symbol) => {
  try {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`);
    const output = response.json();
    console.log(output);
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
      const {
        companyName, symbol, description, mktCap, image, price,
      } = stock;
      const details = {
        name: companyName,
        symbol,
        description,
        mktCap,
        image,
        price,
      };
      state.stockDetail = details;
    },
    [getStockDetail.rejected]: (state) => {
      state.stockDetailError = 'Error loading data, please reload';
    },
  },
});

export default stocksSlice.reducer;

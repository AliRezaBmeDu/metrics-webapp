import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import StockList from '../components/StockList';
import { MemoryRouter } from 'react-router-dom';

// Create a mock dataset
const stocks = [
  {
    companyName: 'Apple',
    symbol: 'aapl',
    exchange: 'nyse',
  },
  {
    companyName: 'microsoft',
    symbol: 'msft',
    exchange: 'nasdaq',
  },
];
  // Create a mock Redux store
const reduxMockStore = configureMockStore();

describe('StockList', () => {
  it('should render loading message when isLoading is true', () => {
    const initialState = { stocks: { 
        stocks,
        isLoading: true,
     } };
    const store = reduxMockStore(initialState);
    // Render the component inside the Provider with the mock store
    render(
      <Provider store={store}>
        <StockList />
      </Provider>,
    );
    const loadingMessage = screen.getByText('Loading...please wait');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('should render stocks when isLoading is false', () => {
    const initialState2 = { stocks: { 
        stocks,
        isLoading: false,
        searchTerm: '',
     } };
    const store = reduxMockStore(initialState2);
    render(
      <Provider store={store}>
        <MemoryRouter>
            <StockList />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('US capital market')).toBeInTheDocument();
    expect(screen.getByText('nyse')).toBeInTheDocument();
    expect(screen.getByText('nasdaq')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('microsoft')).toBeInTheDocument();
  });

  // Test the filter function by using the search term
  it('should filter stocks according to the search term', () => {
    const initialState2 = { stocks: { 
        stocks,
        isLoading: false,
        searchTerm: 'Ap',
     } };
    const store = reduxMockStore(initialState2);
    render(
      <Provider store={store}>
        <MemoryRouter>
            <StockList />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('US capital market')).toBeInTheDocument();
    expect(screen.getByText('nyse')).toBeInTheDocument();
    expect(screen.queryByText('nasdaq')).toBeNull();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('microsoft')).toBeNull();
  });
});

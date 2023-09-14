import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import StockList from '../components/StockList';

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
const mockStore = configureMockStore();

describe('StockList', () => {
  it('should render loading message when isLoading is true', () => {
    const initialState = { stocks: { stocks, isLoading: true } };
    const store = mockStore(initialState);
    // Render the component inside the Provider with the mock store
    render(
      <Provider store={store}>
        <StockList />
      </Provider>,
    );
    const loadingMessage = screen.getByText('Loading...please wait');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('renders rockets when isLoading is false', () => {
    const initialState2 = { rockets: { rockets, isLoading: false } };
    const store = mockStore(initialState2);
    render(
      <Provider store={store}>
        <RocketComponent />
      </Provider>,
    );

    const rocketElements = screen.getAllByTestId('rocket');
    expect(rocketElements).toHaveLength(rockets.length);
  });
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SingleStock from '../components/SingleStock';

// Mock Redux store
const mockStore = configureStore([]);

describe('SingleStock Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      stocks: {
        stockDetail: {
          companyName: 'Test Company',
          image: 'test-image-url',
          mktCap: 'Test Market Cap',
          price: 'Test Price',
          volAvg: 'Test Volume Average',
          sector: 'Test Sector',
          ceo: 'Test CEO',
          website: 'http://example.com',
        },
        loadingDetail: false,
      },
    });

    // Mock the getStockDetail action
    store.dispatch = jest.fn();
  });

  it('renders SingleStock component with stock details', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/stocks/TEST']}>
            <SingleStock />
        </MemoryRouter>
      </Provider>
    );

    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText('Company Name')).toBeInTheDocument();
      expect(screen.getByText('Test Company')).toBeInTheDocument();
    });
  });

  it('renders loading message when loadingDetail is true', () => {
    store = mockStore({
      stocks: {
        stockDetail: {
          companyName: 'Test Company',
          image: 'test-image-url',
          mktCap: 'Test Market Cap',
          price: 'Test Price',
          volAvg: 'Test Volume Average',
          sector: 'Test Sector',
          ceo: 'Test CEO',
          website: 'http://example.com',
        },
        loadingDetail: true,
      },
    });

    // Mock the getStockDetail action
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/stocks/TEST']}>
            <SingleStock />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('stockDetail')).toHaveTextContent('Loading...please wait');
  });

});

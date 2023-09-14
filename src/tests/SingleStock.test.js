import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SingleStock from '../components/SingleStock';
import store from '../redux/store';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';

describe('Stock details: ', () => {
  it('Should render all the components of company details', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SingleStock />
        </BrowserRouter>
      </Provider>,
    );
    const stockDetails = screen.getByTestId('stockDetail');
    expect(stockDetails).toBeInTheDocument();
  });
});
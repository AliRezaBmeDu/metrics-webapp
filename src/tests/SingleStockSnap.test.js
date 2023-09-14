import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import SingleStock from '../components/StockList';

test('Snapshot component rendering test', () => {
  const tree = render(
    <Provider store={store}>
      <BrowserRouter>
        <SingleStock />
      </BrowserRouter>
    </Provider>,
  );

  expect(tree).toMatchSnapshot();
});

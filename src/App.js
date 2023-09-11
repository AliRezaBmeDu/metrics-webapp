import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Stockpage from './pages/Stockpage';
import { getStocks } from './redux/stocks/stocksSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStocks());
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/details" exact element={<Stockpage />} />
      </Routes>
    </Router>
  );
}

export default App;

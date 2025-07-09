import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductQuickCreate from './pages/ProductQuickCreate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/product-quick-create" element={<ProductQuickCreate />} />
      </Routes>
    </Router>
  );
}

export default App;

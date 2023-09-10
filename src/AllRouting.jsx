import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Article from './components/Articles/Articles';
import Admin from './components/Admin/Admin';
import NotFound from './components/NotFound/NotFound';
import SingleProduct from './components/Products/SingleProduct';
import Sales from './components/Admin/Sales';
import Sellers from './components/Admin/Sellers';
const AllRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/" element={<Products />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route path="/articles" element={<Article />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="sales" element={<Sales />} />
        <Route path="sellers" element={<Sellers />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRouting;

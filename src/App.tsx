import React, {useState} from 'react';
import Layout from "./components/Layout";
import {Navigate, Route, Routes} from "react-router-dom";

import CategoriesList from "./pages/CategoriesList";
import ProductDetails from "./pages/ProductDetails";
import Order from "./pages/Order";


function App() {
  return (
    <Layout>
        <Routes>
            <Route path="/"   element={<Navigate replace to={'/all'} />}/>
            <Route path="/order"   element={<Order />}/>
            <Route path="/:categoryId"   element={<CategoriesList />}/>
            <Route path="/product/:productId" element={<ProductDetails />}/>
        </Routes>
    </Layout>
  );
}

export default App;

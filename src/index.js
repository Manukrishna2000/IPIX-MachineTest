import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CategoryPage from "./components/CatalogManagement/Category";
import ProductPage from "./components/CatalogManagement/Product";
import ProductsPage from "./Customer/product";
import CartPage from "./Customer/cart";
import CheckoutPage from "./Customer/checkout";
import Navbar from "./components/CatalogManagement/Navbar";
import CustNav from "./Customer/CustNav";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Navbar />}>
          <Route path="cat" element={<CategoryPage />} />
          <Route path="products" element={<ProductPage />} />
        </Route>
        <Route path="/cust" element={<CustNav />}>
          <Route path="products" element={<ProductsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

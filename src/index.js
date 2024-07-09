import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AdminDashboard from './components/CatalogManagement/AdminDashboard';
import CategoryPage from './components/CatalogManagement/Category';
import ProductPage from './components/CatalogManagement/Product';
import StockListingPage from './components/CatalogManagement/Stock';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/cat" element={<CategoryPage />} />
<Route path="/products" element={<ProductPage />} />
<Route path="/stock" element={<StockListingPage />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

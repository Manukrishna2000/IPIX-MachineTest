import React from 'react';
import StockListingPage from './Stock';
import Navbar from './Navbar';
import CategoryPage from './Category';
import ProductPage from './Product';

const AdminDashboard = () => {
    return (
        <div>
            <Navbar />
            <CategoryPage />
            <ProductPage />
            {/* <StockListingPage /> */}
        </div>
    );
};

export default AdminDashboard;

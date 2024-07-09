import React, { useState, useEffect } from 'react';
import { getStock } from '../../apiservices/adminService';

const StockListingPage = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        const stockData = await getStock();
        setStocks(stockData);
    };

    return (
        <div>
            <h2>Stock Listing</h2>
            <ul>
                {stocks.map(stock => (
                    <li key={stock._id}>{stock.productName}: {stock.quantity}</li>
                ))}
            </ul>
        </div>
    );
};

export default StockListingPage;

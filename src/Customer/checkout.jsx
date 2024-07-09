import React, { useState } from 'react';
import { checkout } from '../apiservices/customerService';

const CheckoutPage = () => {
    const [paymentDetails, setPaymentDetails] = useState('');

    const handleInputChange = (e) => {
        setPaymentDetails(e.target.value);
    };

    const handleCheckout = async () => {
        try {
            await checkout(paymentDetails);
            alert('Purchase completed successfully');
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <input
                type="text"
                value={paymentDetails}
                onChange={handleInputChange}
                placeholder="Payment Details"
            />
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default CheckoutPage;

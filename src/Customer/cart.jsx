import React, { useState, useEffect } from 'react';
import { getCart } from '../apiservices/customerService';

const CartPage = ({ history }) => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const fetchedCart = await getCart();
            setCart(fetchedCart);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const handleCheckout = () => {
        history.push('/checkout');
    };

    if (!cart) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cart.products.map((item) => (
                    <li key={item.product._id}>
                        <h3>{item.product.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.product.price}</p>
                    </li>
                ))}
            </ul>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
    );
};

export default CartPage;

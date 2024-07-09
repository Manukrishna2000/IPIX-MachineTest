import axios from '../api/axios';

const token = localStorage.getItem('token');
const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
};

const getProducts = async (category) => {
    try {
        const response = await axios.get(`/customer/products/${category}`, config
            
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const getCart = async () => {
    try {
        const response = await axios.get('/cart', config);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

const addToCart = async (productId, quantity) => {
    try {
        const response = await axios.post('/cart', { productId, quantity }, config);
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

const checkout = async (paymentDetails) => {
    try {
        const response = await axios.post('/checkout', { paymentDetails }, config);
        return response.data;
    } catch (error) {
        console.error('Error during checkout:', error);
        throw error;
    }
};

export { getProducts, getCart, addToCart, checkout };

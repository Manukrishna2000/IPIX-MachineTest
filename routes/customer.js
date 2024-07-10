const express = require('express');
const Product = require('../models/Product');
const Cart = require('../models/Cart'); // Assume a Cart model exists
const { checkCustomer } = require('../middleware/auth');

const router = express.Router();

router.get('/products', async (req, res) => {
    const { category } = req.query;
    try {
        const query = category ? { category } : {};
        const products = await Product.find(query).populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

router.post('/cart', checkCustomer, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        
        if (!cart) {
            cart = new Cart({ user: req.user.id, products: [] });
        }
        
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(201).json({ message: 'Added to cart successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error adding to cart' });
    }
});

router.get('/cart/:id', checkCustomer, async (req, res) => {
    try {
        let id=req.params.id
        const cart = await Cart.findOne({ user: id }).populate('products.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart' });
    }
});

router.post('/checkout', checkCustomer, async (req, res) => {
    const { paymentDetails } = req.body;
    try {
        res.status(201).json({ message: 'Purchase completed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error completing purchase' });
    }
});


module.exports = router;
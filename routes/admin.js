
const express = require('express');
const { checkAdmin } = require('../middleware/auth');
const Category = require('../models/Category');
const multer = require('multer');
const Product = require('../models/Product');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/category', checkAdmin, async (req, res) => {
    const { name } = req.body;
    try {
        const category = new Category({ name });
        await category.save();
        res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating category' });
    }
});

router.put('/category/:id', checkAdmin, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await Category.findByIdAndUpdate(id, { name });
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating category' });
    }
});

router.delete('/category/:id', checkAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category' });
    }
});


router.post('/product', checkAdmin, upload.array('images', 5), async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    console.log(req.files);
    const images = req.files.map(file => file.filename);
    try {
        const product = new Product({ name, description, price, category, images, stock });
        await product.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating product' });
    }
});

router.put('/product/:id', checkAdmin, upload.array('images', 5), async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const images = req.files.map(file => file.path);
    try {
        await Product.findByIdAndUpdate(id, { name, description, price, category, images, stock });
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
});

router.delete('/product/:id', checkAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
});

router.get('/stock', checkAdmin, async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stock' });
    }
});

router.get('/categories', checkAdmin, async (req, res) => {
    try {
        const category = await Category.find()
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stock' });
    }
});
router.get('/products', checkAdmin, async (req, res) => {
    try {
        const Products = await Product.find()
        console.log(Products);
        res.json(Products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching stock' });
    }
});




module.exports = router;

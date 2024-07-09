import React, { useState, useEffect } from 'react';
import { addProduct, getCategories } from '../../apiservices/adminService';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        // Fetch products from API using productService
    };

    const fetchCategories = async () => {
        try {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddProduct = async () => {
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('categoryId', categoryId);
        images.forEach(image => formData.append('images', image));
        await addProduct(formData);
        setProductName('');
        setCategoryId('');
        setImages([]);
        // Optionally: Refresh product list or show success message
    };

    return (
        <div>
            <h2>Products</h2>
            <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
            />
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                <option value="">Select Category</option>
                {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            <input
                type="file"
                multiple
                onChange={(e) => setImages(Array.from(e.target.files))}
            />
            <button onClick={handleAddProduct}>Add Product</button>
            <ul>
                {/* Display products */}
            </ul>
        </div>
    );
};

export default ProductPage;

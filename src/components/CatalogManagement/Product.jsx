import React, { useState, useEffect } from 'react';
import { addProduct, getCategories, getProduct, editProduct } from '../../apiservices/adminService';

const ProductPage = () => {
    const initialProductState = {
        productName: '',
        stock: '',
        categoryId: '',
        images: [],
        price: '',
        description: ''
    };

    const [productData, setProductData] = useState(initialProductState);
    const [categories, setCategories] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editingMode, setEditingMode] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchCategories = async () => {
        try {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await getProduct();
            setProducts(fetchedProducts); // Assuming getProduct returns an array of products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    const handleImageChange = (e, index) => {
        const newImages = [...productData.images];
        newImages[index] = e.target.files[0];
        setProductData({
            ...productData,
            images: newImages
        });
    };

    const handleAddImageInput = () => {
        setProductData({
            ...productData,
            images: [...productData.images, null]
        });
    };

    const handleRemoveImageInput = (index) => {
        const newImages = [...productData.images];
        newImages.splice(index, 1);
        setProductData({
            ...productData,
            images: newImages
        });
    };

    const handleEditProduct = async (productId) => {
        try {
            const product = products.find(p => p._id === productId);
            setEditingProductId(productId);
            setEditingMode(true);
            setProductData({
                productName: product.name,
                stock: product.stock,
                categoryId: product.category,
                images: product.images,
                price: product.price,
                description: product.description
            });
        } catch (error) {
            console.error('Error fetching product for editing:', error);
        }
    };

    const handleAddProduct = async () => {
        const formData = new FormData();
        formData.append('name', productData.productName);
        formData.append('stock', productData.stock);
        formData.append('category', productData.categoryId);
        formData.append('description', productData.description);
        formData.append('price', productData.price);

        // Loop through images and append them to FormData
        for (let i = 0; i < productData.images.length; i++) {
            formData.append('images', productData.images[i]);
        }

        try {
            if (editingMode && editingProductId) {
                await editProduct(editingProductId, formData);
                setEditingMode(false);
                setEditingProductId(null);
            } else {
                await addProduct(formData);
            }
            setProductData(initialProductState);
            fetchProducts(); // Fetch updated product list after adding/editing
        } catch (error) {
            console.error('Error adding/editing product:', error);
        }
    };

    return (
        <div>
            <h2>{editingMode ? 'Edit Product' : 'Add Product'}</h2>
            <input
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleInputChange}
                placeholder="Product Name"
            />
            <input
                type="text"
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
                placeholder="Stock"
            />
            <input
                type="text"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                placeholder="Description"
            />
            <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="Price"
            />
            <select
                name="categoryId"
                value={productData.categoryId}
                onChange={handleInputChange}
            >
                <option value="">Select Category</option>
                {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            {productData.images.map((image, index) => (
                <div key={index}>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(e, index)}
                    />
                    <button onClick={() => handleRemoveImageInput(index)}>Remove</button>
                </div>
            ))}
            <button onClick={handleAddImageInput}>Add Image</button>
            <button onClick={handleAddProduct}>{editingMode ? 'Update Product' : 'Add Product'}</button>

            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <p>Category ID: {product.category}</p>
                        <div>
                            {product.images.map((image, idx) => (
                                <img key={idx} src={`http://localhost:5000/${image}`} alt="Product" width="100" />
                            ))}
                        </div>
                        <button onClick={() => handleEditProduct(product._id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductPage;

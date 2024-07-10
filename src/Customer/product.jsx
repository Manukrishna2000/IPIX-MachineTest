import React, { useState, useEffect } from 'react';
import { addToCart, getProducts } from '../apiservices/customerService';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        try {
            const products = await getProducts(category);
            setProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await addToCart(productId, 1);
            alert('Product added to cart');
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <div>
            <h2>Products</h2>
            <div>
                <label>Category: </label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button onClick={fetchProducts}>Filter</button>
            </div><br />
            <div className='flex'>
                {products.map((product) => (
                    <div className='product' key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <button ondivck={() => handleAddToCart(product._id)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;

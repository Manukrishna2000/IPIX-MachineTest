import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/categories">Categories</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/stock">Stock</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

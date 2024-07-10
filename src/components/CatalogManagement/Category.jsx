import React, { useState, useEffect } from 'react';
import { addCategory, getCategories, updateCategory, deleteCategory } from '../../apiservices/adminService';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editCategoryId, setEditCategoryId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async () => {
        try {
            await addCategory(categoryName);
            fetchCategories(); 
            setCategoryName('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleEditCategory = async (categoryId, newName) => {
        try {
            await updateCategory(categoryId, newName);
            fetchCategories(); 
            setEditCategoryId(null);
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await deleteCategory(categoryId);
            fetchCategories(); 
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div>
            <h2>Categories</h2>
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category Name"
            />
            <button onClick={handleAddCategory}>Add Category</button>
            <ul>
                {categories.map((category) => (
                    <li key={category._id}>
                        {editCategoryId === category._id ? (
                            <>
                                <input
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                                <button onClick={() => handleEditCategory(category._id, categoryName)}>Save</button>
                                <button onClick={() => setEditCategoryId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {category.name}
                                <button onClick={() => setEditCategoryId(category._id)}>Edit</button>
                                <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryPage;

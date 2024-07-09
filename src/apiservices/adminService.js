import axios from '../api/axios';

const token = localStorage.getItem('token');
const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
};
const addCategory = async (categoryName) => {
    const response = await axios.post('/admin/category', { name: categoryName },config);
    return response.data;
};

const addProduct = async (formData) => {
    const response = await axios.post('/admin/products', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

const getStock = async () => {
    const response = await axios.get('/admin/stock');
    return response.data;
};

const getCategories = async () => {
  
  

    const response = await axios.get('/admin/categories', config);
    return response.data;
};

const updateCategory = async (categoryId, categoryName) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await axios.put(`/admin/category/${categoryId}`, { name: categoryName }, config);
    return response.data;
};

const deleteCategory = async (categoryId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await axios.delete(`/admin/category/${categoryId}`, config);
    return response.data;
};

const updateProduct = async (productId, formData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };

    const response = await axios.put(`/admin/product/${productId}`, formData, config);
    return response.data;
};

const deleteProduct = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await axios.delete(`/admin/product/${productId}`, config);
    return response.data;
};

export { addCategory,getCategories, addProduct, getStock,updateCategory, deleteCategory, updateProduct, deleteProduct, };

import axios from '../api/axios';

const login = async (username, password) => {
    const response = await axios.post('/auth/login', { username, password });
    return response.data;
};

const register = async (username, password, role) => {
    const response = await axios.post('/auth/register', { username, password, role });
    return response.data;
};

export { login, register };
import React, { useState } from 'react';
import { login } from './apiservices/authService';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
let navigate=useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await login(data.username, data.password);
            console.log(response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('id', response.user);
            if(response.role=='admin'){
                navigate('/admin')
            }
            else if(response.role=='customer'){
                navigate('/cust/products')
            }
            setSuccess('Login successful!');
            setError('');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
           <Link to='/register'> <div>Register</div></Link>
        </div>
    );
};

export default Login;

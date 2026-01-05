import React, { useState } from 'react';
import axios from 'axios';
import './HRLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const HRLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, getValidAccessToken } = useAuth();
    
    const getErrorMessage = (error) => {
        if (!error.response?.data) return error.message;

        const data = error.response.data;

        if (typeof data === 'object' && data.error) {
            return data.error;
        }

        if (typeof data === 'object') {
            return Object.entries(data)
                .map(([field, messages]) => {
                    if (Array.isArray(messages)) {
                        return `${field}: ${messages.join(', ')}`;
                    }
                    return `${field}: ${messages}`;
                })
                .join('\n');
        }

        return String(data);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', { email, password });

            const { access, refresh } = response.data.user; 
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            login({ type: 'hr', ...response.data.user });

            navigate('/dashboard');
        } catch (error) {
            alert('Login failed: ' + getErrorMessage(error));
        }
    };

    return (
        <div className="login-page">
            <div className="login-form-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h1>HR Login</h1>
                    <label>
                        <span>Email</span>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <button type="submit">Login</button>
                    <div className="links">
                        <a href="#" className="forgot-password">Forgot password?</a>
                        <Link to="/register" className="register">Register an account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HRLogin;

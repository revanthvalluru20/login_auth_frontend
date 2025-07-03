import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './Login.css'; // Add this for external styling

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            //const res = await axios.post('http://localhost:5000/api/auth/login', form);
            const res = await axios.post('https://login-auth-backend-qhlj.onrender.com/api/auth/login', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('email', form.email);
            login(res.data.name);
            navigate('/home');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h3 className="text-center fw-bold mb-4">Login</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={handleChange} required />
                    </Form.Group>
                    <Button type="submit" className="w-100 gradient-btn">Login</Button>
                </Form>
                <div className="text-center mt-3">
                    <a href="/forgot-password" className="link">Forgot <strong>Password?</strong></a>
                </div>
                <div className="text-center mt-2">
                    <span>Don't have an account? <a href="/" className="link"><strong>Sign up</strong></a></span>
                </div>
            </div>
        </div>
    );
};

export default Login;

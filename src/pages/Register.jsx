import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './Login.css'; // ✅ Reusing the same CSS

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            //const res = await axios.post('http://localhost:5000/api/auth/register', form);
            const res = await axios.post('https://login-auth-backend-qhlj.onrender.com/api/auth/register', form);
            setMessage(res.data.msg);
            setTimeout(() => navigate('/verify-otp', { state: { email: form.email } }), 1000);
        } catch (err) {
            setError(err.response?.data?.msg || 'Something went wrong');
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h3 className="text-center fw-bold mb-4">Register</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 gradient-btn">Register</Button>
                </Form>
                <div className="mt-3 text-center">
                    Already have an account? <a href="/login" className="link"><strong>Login</strong></a>
                </div>
            </div>
        </div>
    );
};

export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import './Login.css'; // ✅ Reuse the same Login.css

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            //await axios.post('http://localhost:5000/api/auth/send-otp', { email });
            await axios.post('https://login-auth-backend-qhlj.onrender.com/api/auth/send-otp', { email });
            setMessage('OTP sent to email');
            setTimeout(() => navigate('/reset-password', { state: { email } }), 1000);
        } catch (err) {
            setError(err.response?.data?.msg || 'Something went wrong');
        }
    };

    return (
        <div className="login-page">
            <div className="login-box text-center">
                <h3 className="fw-bold mb-4">Forgot Password</h3>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 text-start">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="w-100 gradient-btn">Send OTP</Button>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;

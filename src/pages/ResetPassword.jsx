import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import './Login.css'; // ✅ Reusing the same styles

const ResetPassword = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const inputRefs = useRef([]);

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullOtp = otp.join('');
        if (fullOtp.length !== 6) {
            setError('Please enter the full 6-digit OTP');
            return;
        }

        try {
            //await axios.post('http://localhost:5000/api/auth/forgot-password', {
            await axios.post('https://login-auth-backend-qhlj.onrender.com/api/auth/forgot-password', {
                email,
                otp: fullOtp,
                newPassword,
            });
            setMessage('Password reset successful');
            setTimeout(() => navigate('/login'), 1000);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to reset password');
        }
    };

    return (
        <div className="login-page">
            <div className="login-box text-center">
                <h3 className="fw-bold mb-4">Reset Password</h3>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center gap-2 mb-3">
                        {otp.map((value, index) => (
                            <Form.Control
                                key={index}
                                type="text"
                                value={value}
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleOtpChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="otp-input"
                                required
                            />
                        ))}
                    </div>
                    <Form.Group className="mb-3 text-start">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="w-100 gradient-btn">Reset</Button>
                </Form>
            </div>
        </div>
    );
};

export default ResetPassword;

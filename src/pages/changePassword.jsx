import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const ChangePassword = () => {
    const { user } = useAuth();
    const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [step, setStep] = useState(1);
    const [email] = useState(localStorage.getItem('email'));
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
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

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const sendOtp = async () => {
        try {
            //await axios.post('http://localhost:5000/api/auth/send-otp', { email });
            await axios.post('https://login-auth-backend-qhlj.onrender.com/api/auth/send-otp', { email });
            setStep(2);
        } catch (err) {
            setError('Failed to send OTP');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const fullOtp = otp.join('');
        if (fullOtp.length !== 6) {
            setError('Please enter the full 6-digit OTP');
            return;
        }

        try {
            //await axios.post('http://localhost:5000/api/auth/change-password', {
            await axios.post('https://login-auth-backend-qhlj.onrender.com/api/auth/change-password', {
                email,
                oldPassword: form.oldPassword,
                newPassword: form.newPassword,
                otp: fullOtp,
            });
            setMessage('Password changed successfully');
            setTimeout(() => navigate('/home'), 1000);
        } catch (err) {
            setError(err.response?.data?.msg || 'Password change failed');
        }
    };

    return (
        <div className="login-page">
            <div className="login-box text-center">
                <h3 className="fw-bold mb-4">Change Password</h3>

                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                {step === 1 ? (
                    <Form onSubmit={(e) => { e.preventDefault(); sendOtp(); }}>
                        <Form.Group className="mb-3 text-start">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="oldPassword"
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4 text-start">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className="w-100 gradient-btn">Send OTP</Button>
                    </Form>
                ) : (
                    <Form onSubmit={handleChangePassword}>
                        <div className="d-flex justify-content-center gap-2 mb-4">
                            {otp.map((value, index) => (
                                <Form.Control
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={value}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="otp-input"
                                    required
                                />
                            ))}
                        </div>
                        <Button type="submit" className="w-100 gradient-btn">Change Password</Button>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;


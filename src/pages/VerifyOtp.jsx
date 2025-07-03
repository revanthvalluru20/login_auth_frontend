import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import './Login.css'; // ✅ Reuse the same CSS

const VerifyOtp = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const inputRefs = useRef([]);

    if (!email) return <Alert variant="danger">No email provided</Alert>;

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Auto move to next
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
            //const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
            const res = await axios.post('https://login-auth-backend-qhlj.onrender.com/api/auth/verify-otp', {
                email,
                otp: fullOtp
            });
            setMessage(res.data.msg);
            setTimeout(() => navigate('/login'), 1000);
        } catch (err) {
            setError(err.response?.data?.msg || 'Something went wrong');
        }
    };

    return (
        <div className="login-page">
            <div className="login-box text-center">
                <h3 className="fw-bold mb-4">Verify OTP</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center gap-2 mb-4">
                        {otp.map((value, index) => (
                            <Form.Control
                                key={index}
                                type="text"
                                value={value}
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="otp-input"
                                required
                            />
                        ))}
                    </div>
                    <Button type="submit" className="w-100 gradient-btn">Verify</Button>
                </Form>
            </div>
        </div>
    );
};

export default VerifyOtp;

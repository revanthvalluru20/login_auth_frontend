import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Login.css'; // Reuse background and card styles

const Home = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleChangePassword = () => {
        navigate('/change-password');
    };

    return (
        <div className="login-page">
            <div className="login-box text-center d-flex flex-column justify-content-between" style={{ minHeight: '300px' }}>
                {/* Top Right Logout */}
                <div className="d-flex justify-content-end mb-2">
                    <Button
                        style={{ backgroundColor: '#dc3545', border: 'none' }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div><br />

                {/* Center Greeting */}
                <div>
                    <h2 className="fw-bold">
                        Hello <span role="img" aria-label="wave">👋</span> {user} <span role="img" aria-label="rocket">🚀</span>
                    </h2>
                    <p className="mt-3" style={{ fontStyle: 'italic', fontSize: '15px' }}>
                        This project will complete soon. Get ready to experience our interaction platform.
                    </p>
                </div>

                {/* Bottom Center Change Password */}
                <div className="mt-4">
                    <Button
                        style={{ backgroundColor: '#28a745', border: 'none' }}
                        onClick={handleChangePassword}
                    >
                        Change Password
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Home;

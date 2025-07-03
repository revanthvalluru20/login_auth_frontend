import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => localStorage.getItem('name'));

    const login = (name) => {
        setUser(name);
        localStorage.setItem('name', name);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('name');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
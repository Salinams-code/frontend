// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //const [auth, setAuth] = useState({ token: null, user: null });
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: null,
  });

  const login = async (username, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      setAuth({ token: res.data.token, user: res.data.payload });
      console.log("res=>",res);
      console.log("res.data.token=>",res.data.token)
      console.log("res.data.payload=>",res.data.payload)
      console.log("Auth=>",auth)
      localStorage.setItem('token', res.data.token);
      console.log( "loca",localStorage.getItem('token'));
    
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (username, password) => {
    try {
      const res = await axios.post('/api/auth/register', { username, password });
      setAuth({ token: res.data.token, user: res.data.user });
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

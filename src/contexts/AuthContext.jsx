// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ip = 'https://api.spotup.shop';
  
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(`${ip}/api/v1/users/me`);
 
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${ip}/api/v1/users/login`, {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const register = async (fname, lname, email, password) => {
    try {
      const response = await axios.post(`${ip}/api/v1/users/register`, {
        fname,
        lname,
        email,
        password,
        imageUrl: "",
        tel: ""
      });
      setError(null);
      await login(email, password);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const checkEmail = async (email) => {
    try {
      const response = await axios.post(`${ip}/api/v1/users/check-email`, {
        email,
      });

      return response.data;
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${ip}/api/v1/users/logout`, null, {
        

        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setError(null);
      navigate('/login');
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, error, login, register, logout, checkEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

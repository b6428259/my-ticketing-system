// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('http://localhost:8080/api/v1/users/me');
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/login', { email, password });
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
        const response = await axios.post('http://localhost:8080/api/v1/users/register', {
            fname: fname, // Use the passed fname
            lname: lname, // Use the passed lname
            email: email,
            password: password,
            imageUrl: "", // Optional: you could allow users to input a profile picture URL
            tel: "" // Optional: you could add a field for phone number
        });
        setError(null);
        console.log(response);
        // Optionally, directly log in the user upon registration success
        await login(email, password);
    } catch (error) {
        setError(error);
        throw error;
    }
};



const checkEmail = async (email) => {
  try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/checkEmail`, { params: { email } });
      return response.data; // Returns true if the email exists
  } catch (error) {
      console.error('Error checking email:', error);
      throw error; // Propagate the error
  }
};


  const logout = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/users/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, error, login, register, logout, checkEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef(null);

    useEffect(() => {
        if (error) {
            emailRef.current?.focus();
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!email || !password) {
            setError('Please fill out both fields.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/v1/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.email);

            navigate('/');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Invalid email or password. Please try again.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
                    {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                    <TextField
                        inputRef={emailRef}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Typography variant="body2" color="primary">
                            {"Don't have an account? Sign Up"}
                        </Typography>
                    </Link>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;

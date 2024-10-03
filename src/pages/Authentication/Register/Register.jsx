// src/pages/RegisterPage.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tel, setTel] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement registration logic here
        console.log("Registration data", { fname, lname, email, password, tel });
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
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="First Name"
                        onChange={(e) => setFname(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Last Name"
                        onChange={(e) => setLname(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Phone Number"
                        onChange={(e) => setTel(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Link to="/login">
                        <Typography variant="body2" color="text.secondary">
                            {"Already have an account? Sign In"}
                        </Typography>
                    </Link>
                </form>
            </Box>
        </Container>
    );
};

export default RegisterPage;

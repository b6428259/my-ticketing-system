import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch user data
        const fetchUserData = async () => {
            try {
                // Get the token from localStorage
                const token = localStorage.getItem('authToken');
                
                // Ensure there's a token before making the request
                if (!token) {
                    setError('No authentication token found');
                    return;
                }

                // Send GET request to the /users/me endpoint with token in headers
                const response = await axios.get('http://localhost:8080/api/v1/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Set the user data in state
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to fetch user data. Please try again.');
            }
        };

        fetchUserData();
    }, []); // The empty dependency array means this effect runs once after the component mounts.

    return (
        <div>
            <h1>User Profile</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default UserProfile;

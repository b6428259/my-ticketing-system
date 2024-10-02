import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import axios from 'axios';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/users/logout', null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            localStorage.removeItem('token');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="flex justify-between items-center p-6 bg-black">
            <div className="text-xl font-bold flex items-center">
                <AudiotrackIcon className="mr-2" />
                <Link to="/" className="text-white hover:text-gray-300 transition duration-200">
                    SpotOn
                </Link>
            </div>
            <div className="space-x-4">
                <Link to="/" className="text-white hover:text-gray-300 transition duration-200">
                    Home
                </Link>
                <Link to="/about" className="text-white hover:text-gray-300 transition duration-200">
                    About
                </Link>
                <Link to="/help" className="text-white hover:text-gray-300 transition duration-200">
                    Help
                </Link>
                {user ? (
                    <>
                        <span className="text-white">{user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="text-white hover:text-gray-300 transition duration-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="text-white hover:text-gray-300 transition duration-200">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

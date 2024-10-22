import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import PleaseAuth from '../../components/Modals/PleaseAuth';
import { AuthContext } from '../../contexts/AuthContext';
import { Tab, Tabs, Chip, Button } from '@nextui-org/react';
import { GalleryIcon } from './components/GalleryIcon';
import { MusicIcon } from './components/MusicIcon';
import { VideoIcon } from './components/VideoIcon';
import './UserSettings.css';
import { IconButton } from '@mui/material';
import { ArrowLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useContext(AuthContext);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const navigate = useNavigate();


    const handleBack = () => {
        navigate(-1);
    };
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('https://api.spotup.shop/api/v1/users/me');
                setUser(response.data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching user profile:', err);
            }
        };

        if (!isAuthenticated) {
            setAuthModalOpen(true);
        } else {
            fetchUserProfile();
        }
    }, [isAuthenticated]);

    const closeAuthModal = () => {
        setAuthModalOpen(false);
    };

    if (!isAuthenticated) {
        return <PleaseAuth isOpen={isAuthModalOpen} onClose={closeAuthModal} />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <div className="mt-6 ml-12 mb-16">
        <Button
          onClick={handleBack}
          color='danger'
            variant='solid'
            size='md'
            className='text-black'
        >
          <ArrowLeft /> BACK
        </Button>
            </div>
                <Tabs 
                    aria-label="Options" 
                    color="primary" 
                    variant="underlined"
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-divider",
                        cursor: "w-full bg-[#22d3ee]",
                        tab: "max-w-fit px-0 h-12 relative border-b-0 border-r-4 border-transparent transition-colors duration-300",
                        tabContent: "group-data-[selected=true]:text-[#06b6d4]",

                    }}
                    isVertical={true}
                    className='ml-12'
                >
                    <Tab
                        key="photos"
                        title={
                            <div className="flex items-center space-x-2">
                                <GalleryIcon />
                                <span>Photos</span>
                                <Chip size="sm" variant="faded">9</Chip>
                            </div>
                        }
                    />
                    <Tab
                        key="music"
                        title={
                            <div className="flex items-center space-x-2">
                                <MusicIcon />
                                <span>Music</span>
                                <Chip size="sm" variant="faded">3</Chip>
                            </div>
                        }
                    />
                    <Tab
                        key="videos"
                        title={
                            <div className="flex items-center space-x-2">
                                <VideoIcon />
                                <span>Videos</span>
                                <Chip size="sm" variant="faded">1</Chip>
                            </div>
                        }
                    />
                </Tabs>
            </div>
            <PleaseAuth isOpen={isAuthModalOpen} onClose={closeAuthModal} />
        </div>
    );
};

export default UserProfile;

// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import LoginModal from '../../pages/Authentication/Login/LoginModal';
import { AuthContext } from '../../contexts/AuthContext';
import { User } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useDisclosure } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import LogoutModal from '../Modals/LogoutModal'; // Import the new component
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const onPressSettings = () => {
    navigate('/user-settings');
    console.log("Settings button pressed");
  };
  

  return (
    <nav className="flex justify-between items-center p-6 bg-black">
      <div className="text-xl font-bold flex items-center">
        <AudiotrackIcon className="mr-2" />
        <Link to="/" className="text-white hover:text-gray-300 transition duration-200">
          SpotOn
        </Link>
      </div>
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button 
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-6"
                  endContent={<span className="ml-2">▼</span>}
                >
                  <User
                    avatarProps={{
                      isBordered: true,
                      src: user.imageUrl,
                    }}
                    classNames={{
                      name: "text-white",
                      description: "text-gray-300",
                    }}
                    name={`${user.fname} ${user.lname}`}
                    description={user.role}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" textValue="Profile" isReadOnly="true">
                  <div className="font-bold">Signed in as</div>
                  <div>{user.email}</div>
                </DropdownItem>
                <DropdownItem key="blank" textValue="blank" isReadOnly="true">
                  <hr />
                </DropdownItem>
                <DropdownItem key="ticket" textValue="ticket">
                  My Tickets
                </DropdownItem>
                <DropdownItem key="settings" textValue="My Settings" onPress={
                  onPressSettings
                }>
                  Settings
                </DropdownItem>
                <DropdownItem key="analytics" textValue="Analytics">
                  Analytics
                </DropdownItem>
                <DropdownItem key="help_and_feedback" textValue="Help & Feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  className="text-danger" 
                  color="danger" 
                  textValue="Log Out"
                  onPress={onOpen} // Open modal on press
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Use the LogoutModal component */}
            <LogoutModal 
              isOpen={isOpen} 
              onClose={onOpenChange} 
              logout={logout} 
            />
          </>
        ) : (
          <LoginModal />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useContext } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Tabs,
  Tab,
} from '@nextui-org/react';
import { MailIcon } from './components/MailIcon.jsx';
import { LockIcon } from './components/LockIcon.jsx';
import { EyeFilledIcon } from './components/EyeFilledIcon.jsx';
import { EyeSlashFilledIcon } from './components/EyeSlashFilledIcon.jsx';
import { AuthContext } from '../../../contexts/AuthContext.jsx';

export default function LoginRegisterModal() {
  const { login, register, checkEmail } = useContext(AuthContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [loginpassVisible, setLoginpassVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // Track the active tab


  const toggleLoginPasswordVisibility = () => setLoginpassVisible(!loginpassVisible);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleTabChange = (newActiveTab) => {
    setActiveTab(newActiveTab);
    setError(''); // Clear any existing error when switching tabs
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Password should be at least 8 characters, and include upper/lowercase, numbers, and special characters
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill out both fields.');
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      onOpenChange(false);
      window.location.reload();
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

  const handleRegister = async () => {
    setLoading(true);
    setError('');

    if (!fname || !lname || !email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const emailExists = await checkEmail(email);
      if (emailExists) {
        setError('Email is already in use. Please use a different email.');
        setLoading(false);
        return;
      }
    } catch (error) {
      setError('An error occurred while checking email availability. Please try again later.');
      console.error('Error checking email:', error);
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, include upper/lowercase letters, numbers, and special characters.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await register(fname, lname, email, password);
      onOpenChange(false);
      window.location.reload();
    } catch (err) {
      setError('An error occurred during registration. Please try again later.');
      console.error('Error registering:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Login
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={true}
        isKeyboardDismissDisabled={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Authentication</ModalHeader>
              <ModalBody>
                <Tabs aria-label="Login or Register"                   selectedKey={activeTab}
                  onSelectionChange={(key) => handleTabChange(key)}>
                  <Tab key="login" title="Login">
                    {error && <p style={{ color: 'red' }} className="mb-2">{error}</p>}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <Input
                        autoFocus
                        endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Input
                        endContent={
                          <button className="focus:outline-none" type="button" onClick={toggleLoginPasswordVisibility} aria-label="toggle password visibility">
                            {loginpassVisible ? (
                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        label="Password"
                        placeholder="Enter your password"
                        type={loginpassVisible ? "text" : "password"}
                        variant="bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox classNames={{ label: 'text-small' }}>Remember me</Checkbox>
                      <Link color="primary" href="#" size="sm">
                        Forgot password?
                      </Link>
                    </div>

                    <Button color="primary" onPress={handleLogin} disabled={loading}>
                      {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                  </Tab>

                  <Tab key="register" title="Register">
                    {error && <p style={{ color: 'red' }} className="mb-2">{error}</p>}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <Input
                          autoFocus
                          label="First Name"
                          placeholder="Enter your first name"
                          variant="bordered"
                          value={fname}
                          onChange={(e) => setFname(e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <Input
                          label="Last Name"
                          placeholder="Enter your last name"
                          variant="bordered"
                          value={lname}
                          onChange={(e) => setLname(e.target.value)}
                          style={{ flex: 1 }}
                        />
                      </div>
                      <Input
                        endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Input
                        endContent={
                          <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility} aria-label="toggle password visibility">
                            {passwordVisible ? (
                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        label="Password"
                        placeholder="Enter your password"
                        type={passwordVisible ? "text" : "password"}
                        variant="bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Input
                        endContent={
                          <button className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility} aria-label="toggle confirm password visibility">
                            {confirmPasswordVisible ? (
                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        type={confirmPasswordVisible ? "text" : "password"}
                        variant="bordered"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Button color="primary" onPress={handleRegister} disabled={loading} className="mt-3">
                      {loading ? 'Registering...' : 'Register'}
                    </Button>
                  </Tab>
                </Tabs>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="solid" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

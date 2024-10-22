import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import Loading from "./components/Loading/Loading"; // Import Loading component
import './components/Loading/Loading.css'; // Import CSS for Loading 
import Footer from "./components/Footer/Footer"; // Import Footer component
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Authentication/Register/Register";
import { NextUIProvider } from '@nextui-org/react';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProviderWrapper from './provider/ProviderWrapper';

// Lazy load other components
const Home = lazy(() => import("./pages/Home/Home"));
const Payment = lazy(() => import("./pages/Payment/Payment"));
const Kamibfun = lazy(() => import("./pages/Kamibfun/Kamib"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService/TermsOfService"));
const ContactUs = lazy(() => import("./pages/ContactUs/ContactUs"));
const UserSettings = lazy(() => import("./pages/UserSettings/UserSettings"));
const MyTickets = lazy(() => import("./pages/MyTicket/MyTicket"));
const TicketDetail = lazy(() => import("./pages/MyTicket/components/TicketDetail/TicketDetail"));
const ScanTicket = lazy(() => import("./pages/ScanTicket/ScanTicket"));
const Show = lazy(() => import("./pages/Show/Show")); // Lazy load the Show component
const Reserve = lazy(() => import("./pages/Reserve/Reserve")); // Lazy load the Reserve component

function App() {
    const [loading, setLoading] = useState(true); // Loading state
    const location = useLocation(); // Get current location

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Hide loading screen after 2 seconds
        }, 2000); // Adjust timing as needed

        return () => clearTimeout(timer); // Clean up the timer
    }, []);

    // Define paths where the navbar should be hidden
    const hiddenNavbarPaths = ["/kamibfun"]; // Add paths to hide Navbar
    const isNavbarVisible = !hiddenNavbarPaths.includes(location.pathname); // Determine visibility

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="app-container">
                    {isNavbarVisible && <Navbar />}
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/reserve/:concertId" element={<Reserve />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/kamibfun" element={<Kamibfun />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-of-service" element={<TermsOfService />} />
                            <Route path="/contact-us" element={<ContactUs />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/user-settings" element={<UserSettings />} />
                            <Route path="/my-tickets" element={<MyTickets />} />
                            <Route path="/my-tickets/detail/:ticketId" element={<TicketDetail />} />
                            <Route path="/scan-ticket" element={<ScanTicket />} />
                            <Route path="/show/:concertId" element={<Show />} />
                        </Routes>
                    </Suspense>
                    <Footer />
                </div>
            )}
        </>
    );
}

export default function AppWithRouter() {
    return (
        <StrictMode>
            <NextUIProvider>
                <QueryClientProvider client={new QueryClient()}>
                    <Router>
                        <ProviderWrapper>
                            <App />
                        </ProviderWrapper>
                    </Router>
                </QueryClientProvider>
            </NextUIProvider>
        </StrictMode>
    );
}

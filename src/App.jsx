// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import Loading from "./components/Loading/Loading"; // Import Loading component
import './components/Loading/Loading.css'; // Import CSS for Loading 
import Footer from "./components/Footer/Footer"; // Import Footer component
import Navbar from "./components/Navbar/Navbar";


// Lazy load other components
const Home = lazy(() => import("./pages/็Home/Home"));
const TicketSelection = lazy(() => import("../TicketSelection"));
const Payment = lazy(() => import("./pages/Payment/Payment"));
const Kamibfun = lazy(() => import("./pages/Kamibfun/Kamib"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService/TermsOfService"));
const ContactUs = lazy(() => import("./pages/ContactUs/ContactUs"));

export default function App() {
  const [loading, setLoading] = useState(true); // Loading state
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // New state for navbar visibility


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loading screen after 2 seconds
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <Router>
      {loading ? (
        // Show the loading component while loading is true
        <Loading />
      ) : (
        // Show the actual routes once loading is complete
        <>
                  <Navbar isVisible={isNavbarVisible} />

          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reserve" element={<TicketSelection />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/kamibfun" element={<Kamibfun />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
          </Suspense>
          <Footer /> {/* Footer will appear globally */}
        </>
      )}
    </Router>
  );
}
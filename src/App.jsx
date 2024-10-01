// App.jsx
import { HashRouter  as Router, Routes, Route, useLocation } from "react-router-dom"; // Import useLocation
import { useEffect, useState, Suspense, lazy } from "react";
import Loading from "./components/Loading/Loading"; // Import Loading component
import './components/Loading/Loading.css'; // Import CSS for Loading 
import Footer from "./components/Footer/Footer"; // Import Footer component
import Navbar from "./components/Navbar/Navbar";
import Reserve from "./pages/Reserve/Reserve";
import Login from "./pages/Authentication/Login/Login";
import Register from "./pages/Authentication/Register/Register";

// Lazy load other components
const Home = lazy(() => import("./pages/Home/Home"));
const TicketSelection = lazy(() => import("../TicketSelection"));
const Payment = lazy(() => import("./pages/Payment/Payment"));
const Kamibfun = lazy(() => import("./pages/Kamibfun/Kamib"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService/TermsOfService"));
const ContactUs = lazy(() => import("./pages/ContactUs/ContactUs"));

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
  // const hiddenNavbarPaths = ["/kamibfun", "/another-path"]; // Add more paths as needed


  const isNavbarVisible = !hiddenNavbarPaths.includes(location.pathname); // Determine visibility

  return (
    <>
      {loading ? (
        // Show the loading component while loading is true
        <Loading />
      ) : (
        <>
          {isNavbarVisible && <Navbar />} {/* Render Navbar only if visible */}
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reserve" element={<Reserve />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/kamibfun" element={<Kamibfun />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Suspense>
          <Footer /> {/* Footer will appear globally */}
        </>
      )}
    </>
  );
}

// Wrap App with Router
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

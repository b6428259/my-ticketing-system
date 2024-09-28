import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import TicketSelection from "./pages/TicketSelection";
import Payment from "./pages/Payment";
import Kamibfun from "./pages/CustomRese/Kamib";
import Loading from "./pages/Loading/Loading"; // Import Loading component
import './pages/Loading/Loading.css'; // Import CSS for Loading component

export default function App() {
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loading screen after 2 seconds
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <Router>
      {loading && <Loading />} {/* Show loading screen while loading */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reserve" element={<TicketSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/kamibfun" element={<Kamibfun />} />
      </Routes>
    </Router>
  );
}

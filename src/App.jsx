import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import TicketSelection from "./pages/TicketSelection";
import Payment from "./pages/Payment";

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reserve" element={<TicketSelection />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
  
    </Router>
  );
}

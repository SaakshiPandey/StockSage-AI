import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Portfolio from "./pages/Portfolio";
import SmartSuggestions from "./pages/SmartSuggestions";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/portfolio"
          element={
            localStorage.getItem("token") ? (
              <Portfolio />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/smart-suggestions" element={<SmartSuggestions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

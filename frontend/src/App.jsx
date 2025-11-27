import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BookingForm from "./pages/BookingForm";
import AppointmentsList from "./pages/AppointmentsList";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import Register from "./components/Register";
import Layout from "./components/Layout";

export default function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogin = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  const handleLogout = () => {
    localStorage.clear();
    setRole("");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout role={role} onLogout={handleLogout} />}>
          {/* Public Routes */}
          <Route 
            index 
            element={!role ? <UserLogin onLogin={handleLogin} /> : <Navigate to={role === 'admin' ? "/admin" : "/booking"} replace />} 
          />
          <Route 
            path="register" 
            element={!role ? <Register /> : <Navigate to={role === 'admin' ? "/admin" : "/booking"} replace />} 
          />
          <Route 
            path="admin-login" 
            element={!role ? <AdminLogin onLogin={handleLogin} /> : <Navigate to="/admin" replace />} 
          />

          {/* Protected Routes */}
          <Route 
            path="booking" 
            element={role === 'user' ? <BookingForm /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="admin" 
            element={role === 'admin' ? <AppointmentsList /> : <Navigate to="/" replace />} 
          />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

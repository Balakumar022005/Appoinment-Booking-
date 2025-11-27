import { useState } from "react";
import api from "../api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  Link as MuiLink
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";

export default function UserLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role !== "user") {
        setMsg("❌ You are not allowed to login here.");
        return;
      }

      onLogin(res.data.role);
      navigate("/booking");
    } catch (err) {
      setMsg(err.response?.data?.message || "Server error");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Card sx={{ width: 400, boxShadow: 3, borderRadius: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom color="primary">
            Welcome Back
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Please login to your account
          </Typography>

          {msg && <Alert severity="error" sx={{ mb: 2 }}>{msg}</Alert>}

          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            sx={{ mb: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            endIcon={<LoginIcon />}
            onClick={handleSubmit}
            sx={{ mb: 2 }}
          >
            Login
          </Button>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <MuiLink component={Link} to="/register" underline="hover" variant="body2">
              Create Account
            </MuiLink>
            <MuiLink component={Link} to="/admin-login" underline="hover" variant="body2" color="secondary">
              Admin Login
            </MuiLink>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

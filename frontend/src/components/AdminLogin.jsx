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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.role !== "admin") {
        setMsg("❌ Access Denied! Only Admins can login here.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      onLogin(res.data.role);
      navigate("/admin");
    } catch (err) {
      setMsg(err.response?.data?.message || "Server error");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <Card sx={{ width: 400, boxShadow: 3, borderRadius: 4, p: 2 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <AdminPanelSettingsIcon color="secondary" sx={{ fontSize: 50, mb: 1 }} />
            <Typography variant="h4" fontWeight="bold" align="center" gutterBottom color="secondary">
              Admin Portal
            </Typography>
          </Box>

          {msg && <Alert severity="error" sx={{ mb: 2 }}>{msg}</Alert>}

          <TextField
            fullWidth
            label="Admin Email"
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
            color="secondary"
            size="large"
            onClick={handleSubmit}
            sx={{ mb: 2 }}
          >
            Login as Admin
          </Button>

          <Box display="flex" justifyContent="center" mt={2}>
            <MuiLink component={Link} to="/" underline="hover" variant="body2">
              Back to User Login
            </MuiLink>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

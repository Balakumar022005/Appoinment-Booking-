import { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  Alert
} from "@mui/material";
import api from "../api";

export default function UserLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.role !== "user") {
        setMsg("🚫 Admin cannot login here. Please use Admin Login page.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      onLogin(res.data.role);
    } catch (err) {
      setMsg(err.response?.data?.message || "Server error");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
      <Card sx={{ width: 350, p: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" fontWeight={600}>
            User Login
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {msg && <Alert severity="error" sx={{ mt: 2 }}>{msg}</Alert>}

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Login
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Don't have an account? <span style={{ color: "blue", cursor: "pointer" }}>Register</span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

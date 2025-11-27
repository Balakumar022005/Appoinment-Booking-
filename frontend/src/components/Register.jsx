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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        fullName,
        email,
        password,
        role: "user",
      });

      setMsg("Registration successful! Redirecting to login...");
      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Server error");
      setSuccess(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Card sx={{ width: 400, boxShadow: 3, borderRadius: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom color="primary">
            Create Account
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Join us to book appointments easily
          </Typography>

          {msg && <Alert severity={success ? "success" : "error"} sx={{ mb: 2 }}>{msg}</Alert>}

          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            sx={{ mb: 2 }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

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
            endIcon={<PersonAddIcon />}
            onClick={handleRegister}
            sx={{ mb: 2 }}
          >
            Register
          </Button>

          <Box display="flex" justifyContent="center" mt={2}>
            <MuiLink component={Link} to="/" underline="hover" variant="body2">
              Already have an account? Login
            </MuiLink>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

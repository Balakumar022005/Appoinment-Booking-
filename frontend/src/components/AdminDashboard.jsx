import { useEffect, useState } from "react";
import api from "../api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Button
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AdminDashboard({ onLogout }) {
  const [stats, setStats] = useState({ users: 0, appointments: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/appointments/count", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats({
        users: res.data.usersCount,
        appointments: res.data.appointmentsCount,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box
        width="250px"
        sx={{ backgroundColor: "#1e2738", color: "white", p: 3 }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Admin Panel
        </Typography>

        <Divider sx={{ background: "gray", mb: 3 }} />

        <Typography
          sx={{
            cursor: "pointer",
            mb: 2,
            ":hover": { color: "#4c8df5" },
          }}
        >
          Dashboard
        </Typography>

        <Typography
          sx={{
            cursor: "pointer",
            mb: 2,
            ":hover": { color: "#4c8df5" },
          }}
        >
          View Appointments
        </Typography>

        <Button 
          variant="contained"
          color="error"
          sx={{ mt: "auto" }}
          onClick={() => {
            localStorage.clear();
            onLogout();
          }}
        >
          <LogoutIcon /> &nbsp; Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box flexGrow={1} p={4} sx={{ backgroundColor: "#f5f7fa" }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Dashboard Overview
        </Typography>

        <Grid container spacing={3}>
          {/* Total Users */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 5 }}>
              <CardContent>
                <GroupIcon sx={{ fontSize: 40, color: "#4c8df5" }} />
                <Typography variant="h6" mt={1}>Total Users</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {stats.users}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Appointments */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 5 }}>
              <CardContent>
                <EventAvailableIcon sx={{ fontSize: 40, color: "#4c8df5" }} />
                <Typography variant="h6" mt={1}>Appointments</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {stats.appointments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

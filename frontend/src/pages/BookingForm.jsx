import { useState, useEffect } from "react";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  MenuItem,
  Grid,
  Container
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

export default function BookingForm() {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    date: "",
    timeSlot: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments to determine booked slots
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Assuming there's a public or user-accessible endpoint to check availability
        // If GET /appointments is protected for admin, this might fail for users.
        // For now, we'll try to fetch. If it fails, we just won't show booked slots.
        const res = await api.get("/appointments"); 
        setAppointments(res.data);
      } catch (err) {
        console.log("Could not fetch appointments for availability check", err);
      }
    };
    fetchAppointments();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Disable booked slots for selected date
  const bookedSlots = appointments
    ?.filter((a) => a.date === form.date)
    .map((a) => a.timeSlot);

  const handleSubmit = async () => {
    if (!form.fullName || !form.phoneNumber || !form.date || !form.timeSlot || !form.reason) {
      toast.warn("⚠ Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await api.post("/appointments", form);

      toast.success("✔ Appointment booked successfully!");

      setForm({
        fullName: "",
        phoneNumber: "",
        date: "",
        timeSlot: "",
        reason: "",
      });
      
      // Refresh appointments to update booked slots
      const res = await api.get("/appointments");
      setAppointments(res.data);

    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Server Error");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4, boxShadow: 4, borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
            <EventAvailableIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
            <Typography variant="h4" fontWeight="bold" color="primary">
              Book Appointment
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                variant="outlined"
                value={form.fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                type="number"
                variant="outlined"
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: new Date().toISOString().split("T")[0] }}
                variant="outlined"
                value={form.date}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Time Slot"
                name="timeSlot"
                variant="outlined"
                value={form.timeSlot}
                onChange={handleChange}
                disabled={!form.date}
              >
                <MenuItem value=""><em>Select Time Slot</em></MenuItem>
                {["10AM", "11AM", "12PM", "4PM", "5PM"].map((t) => (
                  <MenuItem key={t} value={t} disabled={bookedSlots.includes(t)}>
                    {bookedSlots.includes(t) ? `❌ ${t} (Booked)` : t}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason for visit"
                name="reason"
                multiline
                rows={3}
                variant="outlined"
                value={form.reason}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ mt: 1 }}
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
}

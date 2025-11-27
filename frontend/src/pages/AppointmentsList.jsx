import { useEffect, useState } from "react";
import api from "../api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  InputAdornment
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.log("❌ Error fetching appointments:", err);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await api.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch {
      alert("❌ Failed to delete");
    }
  };

  // Filter logic
  const filteredAppointments = appointments.filter((a) => {
    const matchName = a.fullName.toLowerCase().includes(search.toLowerCase());
    const matchDate = filterDate ? a.date === filterDate : true;
    return matchName && matchDate;
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Appointments
        </Typography>
        <Button 
          startIcon={<RefreshIcon />} 
          variant="outlined" 
          onClick={fetchAppointments}
        >
          Refresh
        </Button>
      </Box>

      {/* SEARCH & FILTER */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          label="Search by name"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />

        <TextField
          type="date"
          label="Filter by Date"
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <Button
          variant="text"
          onClick={() => {
            setSearch("");
            setFilterDate("");
          }}
        >
          Reset
        </Button>
      </Paper>

      {filteredAppointments.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary" mt={4}>
          No matching appointments found.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Time</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reason</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredAppointments.map((a) => (
                <TableRow key={a._id} hover>
                  <TableCell>{a.fullName}</TableCell>
                  <TableCell>{a.phoneNumber}</TableCell>
                  <TableCell>
                    <Chip label={a.date} color="primary" variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={a.timeSlot} color="secondary" size="small" />
                  </TableCell>
                  <TableCell>{a.reason}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="error" 
                      onClick={() => deleteAppointment(a._id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

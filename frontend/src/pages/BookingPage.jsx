import { useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import AppointmentsList from "./AppointmentsList";
import api from "../api";

export default function BookingPage() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <BookingForm appointments={appointments} onBookingSuccess={fetchAppointments} />
      <AppointmentsList appointments={appointments} />
    </div>
  );
}

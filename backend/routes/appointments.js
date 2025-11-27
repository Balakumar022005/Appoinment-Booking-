import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// Create Appointment
router.post("/", async (req, res) => {
  try {
    const { fullName, phoneNumber, date, timeSlot, reason } = req.body;

    // Validate required fields
    if (!fullName || !phoneNumber || !date || !timeSlot || !reason) {
      return res.status(400).json({ message: "❌ All fields are required." });
    }

    // Check if the slot is already booked
    const exists = await Appointment.findOne({ date, timeSlot });

    if (exists) {
      return res.status(400).json({ message: "❌ This slot is already booked. Please choose another time." });
    }

    // Create and save new appointment
    const newAppointment = await Appointment.create({
      fullName,
      phoneNumber,
      date,
      timeSlot,
      reason,
    });

    return res.status(201).json({
      message: "✔ Appointment booked successfully!",
      appointment: newAppointment
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "⚠ Server error. Please try again later.",
      error: error.message,
    });
  }
});

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    return res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "⚠ Failed to fetch appointments.",
      error: error.message,
    });
  }
});
// Delete Appointment
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  reason: { type: String, required: true },
});

export default mongoose.model("Appointment", appointmentSchema);

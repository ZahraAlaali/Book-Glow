const mongoose = require("mongoose")
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    salonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
      required: true,
    },
    dateTime: { type: Date, require: true },
    time: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const Appointment = mongoose.model("Appointment", appointmentSchema)
module.exports = Appointment

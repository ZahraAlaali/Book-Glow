const mongoose = require("mongoose")
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
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

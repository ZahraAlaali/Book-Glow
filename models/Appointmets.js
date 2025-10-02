const mongoose = require('mongoose')
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true
    },
    salonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Salon',
      required: true
    },
    dateTime: {
      timestamps: true
    }
  }
)

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment

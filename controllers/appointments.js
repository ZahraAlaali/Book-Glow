const Appointment = require("../models/Appointments")
const Salon = require("../models/salon")

exports.appointment_index_get = async (req, res) => {
  const appointments = await Appointment.find({user: req.session.user._id}).populate("userId").populate("salonId");
  res.render("appointments/index.ejs", { appointments })
}

exports.appointment_create_get = async (req, res) => {
  const salons = await Salon.find();
  res.render("appointments/new.ejs", { salons })
}

exports.appointment_create_post = async (req, res) => {
  req.body.userId = req.session.user._id
  await Appointment.create(req.body)
  res.redirect("/appointments")
}

exports.appointment_show_get = async (req, res) => {
  const appointment = await Appointment.findById(req.params.appointmentId).populate("userId").populate("salonId")
  res.render("appointments/show.ejs", { appointment })
}

exports.appointment_edit_get = async (req, res) => {
  const appointment = await Appointment.findById(req.params.appointmentId).populate("userId").populate("salonId")
  res.render("appointments/edit.ejs", { appointment })
}

exports.appointment_update_put = async (req, res) => {
  const currentAppointment = await Appointment.findById(req.params.appointmentId)
  if (currentAppointment.userId.equals(req.session.user._id)) {
    await currentAppointment.updateOne(req.body)
    res.redirect("/appointments")
  }else {
    res.send("You don't have permission to edit this appointment")
  }
}

exports.appointment_delete_delete = async (req, res) => {
  const appointment = await Appointment.findById(req.params.appointmentId)
  if (appointment.userId.equals(req.session.user._id)) {
    await Appointment.findByIdAndDelete(req.params.appointmentId)
    res.redirect("/appointments")
  } else {
    res.send("You don't have permission to edit this appointment")
}
}

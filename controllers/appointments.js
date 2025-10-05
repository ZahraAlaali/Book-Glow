const Appointment = require("../models/Appointment")
const Salon = require("../models/Salon")

exports.appointment_index_get = async (req, res) => {
  const appointments = await Appointment.find({ user: req.session.user._id })
    .populate("userId")
    .populate("salonId")
  res.render("appointments/index.ejs", { appointments })
}

exports.appointment_create_get = async (req, res) => {
  const salon = await Salon.findById(req.params.salonId)
  res.render("appointments/new.ejs", { salon })
}

exports.appointment_create_post = async (req, res) => {
  req.body.salonId = req.params.salonId
  await Appointment.create(req.body)
  res.redirect(`/salon/${req.params.salonId}`)
}

exports.appointment_show_get = async (req, res) => {
  const appointment = await Appointment.findById(req.params.appointmentId)
    .populate("userId")
    .populate("salonId")
  const appointments = await Appointment.find({ salonId: req.params.salonId })
  res.render("appointments/show.ejs", { appointments })
}

exports.appointment_edit_get = async (req, res) => {
  const appointment = await Appointment.findById(req.params.appointmentId)
    .populate("userId")
    .populate("salonId")
  res.render("appointments/edit.ejs", { appointment })
}

exports.appointment_update_put = async (req, res) => {
  const currentAppointment = await Appointment.findById(
    req.params.appointmentId
  )
  if (currentAppointment.userId.equals(req.session.user._id)) {
    await currentAppointment.updateOne(req.body)
    res.redirect("/appointments")
  } else {
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

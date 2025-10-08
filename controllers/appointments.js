const Appointment = require("../models/Appointment")
const Salon = require("../models/Salon")
const Service = require("../models/Service")

exports.appointment_index_get = async (req, res) => {
  const appointments = await Appointment.find({ userId: req.session.user._id })
    .populate("userId")
    .populate("salonId")
    .populate("services")
  res.render("appointments/index.ejs", { appointments })
}

exports.book_index_get = async (req, res) => {
  const salonId = req.params.salonId
  const appointments = await Appointment.find({
    salonId: req.params.salonId,
    userId: null,
  }).populate("salonId")
  const services = await Service.find({ salonId: req.params.salonId })
  res.render("salons/book.ejs", {
    appointments,
    services,
    salonId: req.params.salonId,
  })
}

exports.appointment_book_post = async (req, res) => {
  const bookingData = {
    userId: req.session.user._id,
    services: req.body.services
  }
  await Appointment.findByIdAndUpdate(req.body.appointment_id, bookingData)

  res.redirect("/appointment")
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
  const userAppointment = await Appointment.findById(req.params.appointmentId)
    .populate("userId")
    .populate("salonId")
    .populate("services")
  const salonAppointments = await Appointment.find({ salonId: req.params.salonId })
  res.render("appointments/show.ejs", { userAppointment , salonAppointments })
}

exports.appointment_edit_get = async (req, res) => {
  const appointment = await Appointment.findById(req.params.appointmentId)
    .populate("userId")
    .populate("salonId")
  const services = await Service.find({salonId: appointment.salonId})
  res.render("appointments/edit.ejs", { appointment, services })
}

exports.appointment_update_put = async (req, res) => {
  const currentAppointment = await Appointment.findById(
    req.params.appointmentId
  )
  if (currentAppointment.userId.equals(req.session.user._id)) {
    await currentAppointment.updateOne(req.body)
    res.redirect("/appointment")
  } else {
    res.send("You don't have permission to edit this appointment")
  }
}

exports.ownerAppointments_get = async (req, res) =>{
  const salonId = req.params.salonId
  const appointments = await Appointment.find({ salonId: salonId }). populate("userId").populate("services")

  res.render("appointments/owner.ejs", { appointments })
}

exports.appointment_owner_delete = async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.body.appointment)
  if (appointment) {
    res.redirect(`/salon/${req.params.salonId}`)
  } else {
    res.send("You don't have permission to edit this appointment")
  }
}

exports.appointment_delete_delete = async (req, res) => {

  const appointment = await Appointment.findById(req.params.appointmentId)
  if (appointment) {
    await Appointment.updateOne({_id:appointment._id},{
      $unset: {services:"", userId:""}
    })
    res.redirect("/appointment")
  } else {
    res.send("You don't have permission to edit this appointment")
  }
}

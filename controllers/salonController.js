const Salon = require("../models/Salon.js")
const Service = require("../models/Service")
const Appointment = require("../models/Appointment")
const Rating = require("../models/Rating")

exports.salon_create_get = async (req, res) => {
  res.render("salons/create.ejs")
}
exports.salon_create_post = async (req, res) => {
  const salonInDatabase = await Salon.findOne({ name: req.body.name})
  if (salonInDatabase) {
    return res.send("This Salon Already Exist!")
  }

  const phoneNum = req.body.phone
  if (phoneNum.length !== 8) {
    return res.send("Phone number must be 8 digits")
  }

  if (req.file) {
    req.body.salonImg = `/uploads/${req.file.filename}`
  }

  req.body.ownerId = req.session.user._id

  const salon = await Salon.create(req.body)


  res.redirect(`/salon/${salon._id}`)
}

exports.get_index = async (req, res) => {
  let salons
  if(req.session.user.role ==="owner"){
    salons = await Salon.find({
    ownerId: req.session.user._id
  })
  } else{
    salons = await Salon.find()
  }

  res.render("salons/index.ejs", { salons })
}

exports.salon_show_get = async (req, res) => {
  const salon = await Salon.findOne({ _id: req.params.salonId })
  const services = await Service.find({ salonId: req.params.salonId })
  const appointments = await Appointment.find({ salonId: req.params.salonId })
  const ratings = await Rating.find({ salonId: req.params.salonId }).populate(
    "userId"
  )
  const appointments = await Appointment.find({salonId:req.params.salonId}).populate("userId").populate("services")
  const ratings = await Rating.find({salonId: req.params.salonId}).populate("userId")
  const services = await Service.find({ salonId: req.params.salonId })
  const userRating = await Rating.findOne({
    salonId: req.params.salonId,
    userId: req.session.user._id,
  })


  const salonImg = await Salon.find({ salonImg: req.params.salonImg })
  console.log(userRating)


  res.render("salons/show.ejs", {
    salon,
    appointments,
    services,
    ratings,
    userRating,
    salonImg,
  })
}

exports.salon_edit_get = async (req, res) => {
  const salon = await Salon.findOne({ _id: req.params.salonId })
  res.render("salons/edit.ejs", { salon })
}

exports.salon_update_put = async (req, res) => {
  const salon = await Salon.findByIdAndUpdate(req.params.salonId, req.body)
  salon.set(req.body)
  await salon.save()
  res.redirect(`/salon/${req.params.salonId}`)
}

exports.salon_delete = async (req, res) => {
  await Rating.deleteMany({salonId: req.params.salonId})
  await Service.deleteMany({ salonId: req.params.salonId })
  await Appointment.deleteMany({ salonId: req.params.salonId })
  await Salon.findByIdAndDelete(req.params.salonId)
  res.redirect("/salon")
}

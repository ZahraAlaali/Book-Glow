const Salon = require("../models/Salon")
const Service = require("../models/Service")

exports.addService_get = async (req, res) => {
  const salon = { _id: "68de6ea59b85efa19f5de528" }
  res.render("services/create.ejs", { salon })
}

// Create salon's services
exports.addService = async (req, res) => {
  const salonInDatabase = await Salon.findById(req.params.salonId)
  if (salonInDatabase && salonInDatabase.ownerId.equals(req.session.user._id)) {
    req.body.salonId = req.params.salonId
    const service = await Service.create(req.body)
    res.redirect(`/salon/${req.params.salonId}`)
  } else res.send("error")
}

// Get edit page
exports.editService = async (req, res) => {
  const service = await Service.findOne({
    _id: req.params.serviceId,
    salonId: req.params.salonId,
  })
  if (service) {
    res.render("services/edit.ejs", { service, salonId: req.params.salonId })
  } else res.send("error")
}

// Update salon's service
exports.UpdateService = async (req, res) => {
  const salonInDatabase = await Salon.findById(req.params.salonId)
  if (salonInDatabase && salonInDatabase.ownerId.equals(req.session.user._id)) {
    await Service.findByIdAndUpdate(req.params.serviceId, req.body)
    res.redirect(`/salon/${req.params.salonId}`)
  } else res.send("error")
}

// delete service
exports.deleteService = async (req, res) => {
  const salonInDatabase = await Salon.findById(req.params.salonId)
  if (salonInDatabase && salonInDatabase.ownerId.equals(req.session.user._id)) {
    await Service.findByIdAndDelete(req.params.serviceId)
    res.redirect(`/salon/${req.params.salonId}`)
  } else res.send("error")
}

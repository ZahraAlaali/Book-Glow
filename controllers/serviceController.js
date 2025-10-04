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
    res.send({ service })
  } else res.send("error")
}

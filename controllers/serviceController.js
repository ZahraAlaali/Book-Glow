const Salon = require("../models/Salon")
const Service = require("../models/Service")

exports.addService_get = async (req, res) => {
  const salon = { _id: "68de6ea59b85efa19f5de528" }
  res.render("services/create.ejs", { salon })
}

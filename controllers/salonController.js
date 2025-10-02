const Salon = require("../models/Salon")

exports.salon_show_get = async (req,res)=>{
  const salon = await Salon.findById(req.params.salonId)
  res.render('salons/show.ejs', {salon})
}

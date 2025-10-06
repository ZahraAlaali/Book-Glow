const Rating = require("../models/Rating")

exports.createRating = async (req, res) => {
  req.body.salonId = req.params.salonId
  req.body.userId = req.params.userId
  await Rating.create(req.body)
  res.redirect(`/salon/${req.params.salonId}`)
}

exports.updateRating = async (req, res) => {
  req.body.salonId = req.params.salonId
  req.body.userId = req.params.userId
  await Rating.findByIdAndUpdate(req.params.ratingId, req.body)
  res.redirect(`/salon/${req.params.salonId}`)
}

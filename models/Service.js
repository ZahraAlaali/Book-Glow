const mongoose = require('mongoose')

const servicesSchema = new mongoose.Schema(
  {
    name: String,
    salonId: {type: mongoose.Schema.Types.ObjectId,ref: 'Salon', required: true},
    price: Number
  },
  { timestamps: true }
)

const Service = mongoose.model('Service', servicesSchema)
module.exports = Service

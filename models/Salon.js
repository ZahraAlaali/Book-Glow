const mongoose = require("mongoose")

const salonSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    phone: Number,
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
)

const Salon = mongoose.model("Salon", salonSchema)

module.exports = Salon

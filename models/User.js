const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    role: {
      type: String,
      enum: ["owner", "user"],
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)
module.exports = User

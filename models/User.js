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
      name:{
        type: String,
      },
      image:{
        data: Buffer,
        contentType: String
      }
    },
    role: {
      type: String,
      enum: ["owner", "user"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)
module.exports = User

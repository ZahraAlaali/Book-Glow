const bcrypt = require("bcrypt")
const User = require("../models/User.js")

exports.auth_signUp_get = async (req, res) => {
  res.render("auth/sign-up.ejs")
}

exports.auth_signUp_post = async (req, res) => {
  const userInDatabase = await User.findOne({
    email: req.body.email,
  })

  if (userInDatabase) {
    return res.send("This Account Already exist!")
  }

  if (req.body.password !== req.body.confirmsPassword) {
    return res.send("Password and confirm password must match")
  }

  const hashedPassword = bcrypt.hashSync(req.body.password,10)
  req.body.password = hashedPassword

  const user = await User.create(req.body)
  res.send(`Welcome ${user.username}`)
}


exports.auth_signin_get =  async (req, res) => {
  res.render("auth/sign-in.ejs")
}

exports.auth_signin_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username});
  if(!userInDatabase){
    return res.send("Login failed. Please try again later...")
}

  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id
  };

  res.redirect("/");
}

exports.signOut = async (req, res) => {
  req.session.destroy()
  res.redirect("/auth/sign-in")
}

exports.UpdatePassword = async (req, res) => {
  const user = await User.findById(req.params.userId)
  if (!user) return res.send("User does not exists!")

  const validatePassword = bcrypt.compareSync(
    req.body.oldPassword,
    user.password
  )
  if (!validatePassword) return res.send("Your Old Password is not correct")
  if (req.body.newPassword != req.body.confirmPassword)
    return res.send("Password and Confirm Password must match")
  const hashedPass = bcrypt.hashSync(req.body.newPassword, 10)
  user.password = hashedPass
  await user.save()

  res.send("password updated")
}


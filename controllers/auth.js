const bcrypt = require("bcrypt")
const User = require("../models/User.js")
const Salon = require("../models/Salon")

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

  const userName = await User.findOne({
    username: req.body.username,
  })

  if (userName) {
    return res.send("This Username is Already Taken. Please Choose Another.")
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and confirm password must match")
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  const phoneNum = req.body.phone
  if (phoneNum.length !== 8) {
    return res.send("Phone number must be 8 digits")
  }

  const user = await User.create(req.body)
  res.render("auth/sign-in.ejs")
}

exports.auth_signin_get = async (req, res) => {
  res.render("auth/sign-in.ejs")
}

exports.auth_signin_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (!userInDatabase) {
    return res.send("Login failed. Please try again later...")
  }
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )
  if (!validPassword) {
    return res.send("Login failed. Please try again later...")
  }

  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
    role: userInDatabase.role,
    email: userInDatabase.email,
    phone: userInDatabase.phone,
    profileImg: userInDatabase.profileImg,
  }

  res.redirect("/salon")
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

exports.auth_profile_get = async (req, res) => {
  res.render("auth/profile.ejs")
}

exports.auth_profile_post = async (req, res) => {
  if (req.file) {
    req.body.profileImg = `/uploads/${req.file.filename}`
  }

  await User.findByIdAndUpdate(req.params.userId, req.body)

  req.session.user.profileImg = req.body.profileImg
  res.redirect(`/auth/${req.params.userId}/profile`)
}

exports.auth_profile_put = async (req, res) => {
  const userInDatabase = await User.findOne({
    email: req.body.email,
  })

  if (userInDatabase && !userInDatabase._id.equals(req.params.userId)) {
    return res.send("This Account Already exist!")
  }

  const userName = await User.findOne({
    username: req.body.username,
  })

  if (userName && !userName._id.equals(req.params.userId)) {
    return res.send("This Username is Already Taken. Please Choose Another.")
  }
  const phoneNum = req.body.phone
  if (phoneNum.length !== 8) {
    return res.send("Phone number must be 8 digits")
  }

  await User.findByIdAndUpdate(req.params.userId, req.body)
  const user = await User.findById(req.params.userId)
  req.session.user.username = user.username
  req.session.user._id = user._id
  req.session.user.role = user.role
  req.session.user.email = user.email
  req.session.user.phone = user.phone
  res.redirect(`/auth/${req.params.userId}/profile`)
}

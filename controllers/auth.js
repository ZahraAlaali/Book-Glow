const session = require("express-session")
const User = require("../models/user")

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

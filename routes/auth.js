const router = require("express").Router()
const authCtrl = require("../controllers/auth")

// Routes
// Sign Out
router.get("/sign-out", authCtrl.signOut)

// Update password
router.put("/:userId", authCtrl.UpdatePassword)

// Sign Up
router.get("/sign-up", authCtrl.auth_signUp_get)
router.post("/sign-up", authCtrl.auth_signUp_post)

// Sign In
router.get("/sign-in", authCtrl.auth_signin_get)
router.post("/sign-in", authCtrl.auth_signin_post)



module.exports = router

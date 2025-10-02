const router = require("express").Router()
const authCtrl = require("../controllers/auth")

// Routes
// Sign Out
router.get("/sign-out", authCtrl.signOut)

// Update password
router.put("/:userId", authCtrl.UpdatePassword)

module.exports = router

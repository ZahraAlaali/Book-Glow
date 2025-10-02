
const router = require("express").Router()
const authCtrl = require("../controllers/auth")

// Routes
// Sign Out
router.get("/sign-out", authCtrl.signOut)

// Update password
router.put("/:userId", authCtrl.UpdatePassword)

router.get('/sign-up', authCtrl.auth_signUp_get)
router.post('/sign-up', authCtrl.auth_signUp_post)


module.exports = router

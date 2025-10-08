const router = require("express").Router()
const authCtrl = require("../controllers/auth")
const upload = require("../Middlewares/upload")

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

router.get("/:userId/profile", authCtrl.auth_profile_get)
router.post(
  "/:userId/profile",
  upload.single("profileImg"),
  authCtrl.auth_profile_post
)

router.put("/:userId/profile", authCtrl.auth_profile_put)

module.exports = router

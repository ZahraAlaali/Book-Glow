const router = require("express").Router()
const salonCtrl = require("../controllers/salonController")

router.get("/:salonId", salonCtrl.salon_show_get)

module.exports = router

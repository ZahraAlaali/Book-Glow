const router = require("express").Router()
const ratingCtrl = require("../controllers/ratingsController")

router.post("/:salonId/:userId", ratingCtrl.createRating)
router.put("/:salonId/:userId/:ratingId", ratingCtrl.updateRating)







module.exports = router

const router = require("express").Router()
const ratingCtrl = require("../controllers/ratingsController")

router.post("/:salonId/:userId", ratingCtrl.createRating)
router.put("/:salonId/:userId/:ratingId", ratingCtrl.updateRating)
router.delete("/:salonId/:ratingId", ratingCtrl.deleteRating)







module.exports = router

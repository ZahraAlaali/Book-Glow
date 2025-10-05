const router = require("express").Router()
const salonCtrl = require("../controllers/salonController")


router.get('/create', salonCtrl.salon_create_get)
router.post('/create', salonCtrl.salon_create_post)

router.get("", salonCtrl.get_index)

router.get("/:salonId", salonCtrl.salon_show_get)

router.get('/:salonId/edit' , salonCtrl.salon_edit_get)
router.put('/:salonId' , salonCtrl.salon_update_put)

router.delete('/:salonId', salonCtrl.salon_delete)

module.exports = router

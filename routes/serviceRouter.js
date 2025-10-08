const router = require("express").Router()
const serviceCtrl = require("../controllers/serviceController")

// router.get("/:salonId/new", serciveCtrl.addService_get)
router.post("/:salonId", serviceCtrl.addService)

router.get("/:salonId/:serviceId/edit", serviceCtrl.editService)
router.put("/:salonId/:serviceId", serviceCtrl.UpdateService)

router.delete("/:salonId/:serviceId", serviceCtrl.deleteService)

module.exports = router

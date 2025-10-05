const router = require("express").Router()
const serciveCtrl = require("../controllers/serviceController")

router.get("/:salonId/new", serciveCtrl.addService_get)
router.post("/:salonId", serciveCtrl.addService)

router.get("/:salonId/:serviceId/edit", serciveCtrl.editService)
router.put("/:salonId/:serviceId", serciveCtrl.UpdateService)

router.delete("/:salonId/:serviceId/", serciveCtrl.deleteService)

module.exports = router

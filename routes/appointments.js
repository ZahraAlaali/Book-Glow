const router = require('express').Router();
const appointmentCtrl = require('../controllers/appointments')

// Routes
router.get('/', appointmentCtrl.appointment_index_get)
router.get('/new', appointmentCtrl.appointment_create_get)
// slash only cause it post
router.get('/:salonId/appointments/new', appointmentCtrl.appointment_create_get)
router.post('/:salonId/appointments/new', appointmentCtrl.appointment_create_post)


router.get("/:appointmentId/edit", appointmentCtrl.appointment_edit_get);
router.put("/:appointmentId", appointmentCtrl.appointment_update_put);
router.delete("/:appointmentId", appointmentCtrl.appointment_delete_delete);

module.exports = router;

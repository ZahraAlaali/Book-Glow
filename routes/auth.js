const router = require('express').Router()
const authCtrl = require('../controllers/auth')

//routes

router.get('/sign-up', authCtrl.auth_signUp_get)
router.post('/sign-up', authCtrl.auth_signUp_post)

module.exports = router

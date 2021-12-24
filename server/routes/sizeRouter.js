const Router = require('express')
const deviceController = require('../controllers/deviceController')
const router = new Router()

router.post('/width', deviceController.createWidth)
router.post('/height', deviceController.createHeight)
router.post('/forma' , deviceController.createForma)

router.get('/width' , deviceController.getWidth)
router.get('/height' , deviceController.getHeight)
router.get('/forma' , deviceController.getForma)

module.exports = router
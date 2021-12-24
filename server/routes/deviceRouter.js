const Router = require('express')
const router = new Router()

const deviceController = require('../controllers/deviceController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.post('/', authMiddleware ,deviceController.createDevice)

module.exports = router
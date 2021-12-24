const Router = require('express')
const typeController = require('../controllers/typeController')
const router = new Router()


router.get('/', typeController.getAll)
router.get('/:id', typeController.getOne)
router.post('/', typeController.createType)

module.exports = router
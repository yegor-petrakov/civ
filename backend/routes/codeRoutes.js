const express = require('express')
const router = express.Router()
const codesController = require('../controllers/codesController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(codesController.getAllCodes)
    .post(codesController.createNewCode)
    
    router.route('/:id')
    .get(codesController.getCodeById)
    .patch(codesController.updateCode)
    .delete(codesController.deleteCode)

module.exports = router
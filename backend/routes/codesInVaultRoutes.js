const express = require('express')
const router = express.Router()
const codesInVaultsController = require('../controllers/codesInVaultsController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(codesInVaultsController.getAllCodesInVaults)
    .post(codesInVaultsController.createNewCodeInVault)
    
    router.route('/:id')
    .delete(codesInVaultsController.deleteCodeInVault)
    .get(codesInVaultsController.getAllCodesInVaults)

module.exports = router
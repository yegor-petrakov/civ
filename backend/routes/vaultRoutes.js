const express = require('express')
const router = express.Router()
const vaultsController = require('../controllers/vaultsController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(vaultsController.getAllVaults)
    .post(vaultsController.createNewVault)

router.route('/:id')
    .get(vaultsController.getVaultById)
    .patch(vaultsController.updateVault)
    .delete(vaultsController.deleteVault)

module.exports = router
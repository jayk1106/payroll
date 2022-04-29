const express = require('express');

const creditControllers = require('../controllers/credit');

const router = express.Router();

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

router.get('/all/:orgId', authUser, getPermissions, isAdmin , creditControllers.getAllOrganizationsCredits);

router.get('/:empId', authUser , creditControllers.getCredits);

router.put('/settle/:creditId', authUser, getPermissions, isAdmin, creditControllers.putSettleCredit);
 
router.post('/' , authUser, creditControllers.postCredit);

router.put('/' , authUser, creditControllers.putCredits);

router.delete('/:id' , creditControllers.deleteCredit);

module.exports = router;
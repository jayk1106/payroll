const express = require('express');

const creditsTypesControllers = require('../controllers/credits_type');

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/:orgId' , authUser, creditsTypesControllers.getCreditsTypes);

router.post('/' , authUser, getPermissions, isAdmin, creditsTypesControllers.postCreditsType);

router.put('/' , authUser, getPermissions, isAdmin, creditsTypesControllers.putCreditsType);

router.delete('/:id' , authUser, getPermissions, isAdmin, creditsTypesControllers.deleteCreditsType);

module.exports = router;
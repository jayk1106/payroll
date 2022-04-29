const express = require('express');

const orgControllers = require('../controllers/organization');

const router = express.Router();

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

router.get('/:orgId' , orgControllers.getOrganization);

router.post('/' , authUser, getPermissions, isAdmin , orgControllers.postOrganization);

router.put('/' , authUser, getPermissions, isAdmin , orgControllers.putOrganization);

router.delete('/' , authUser, getPermissions, isAdmin , orgControllers.deleteOrganization);

module.exports = router;
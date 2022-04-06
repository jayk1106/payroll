const express = require('express');

const orgControllers = require('../controllers/organization');
const authUser = require('../middlewares/auth-user');

const router = express.Router();

router.get('/' , orgControllers.getOrganization);

router.post('/' , authUser , orgControllers.postOrganization);

router.put('/' , authUser , orgControllers.putOrganization);

router.delete('/' , authUser , orgControllers.deleteOrganization);

module.exports = router;
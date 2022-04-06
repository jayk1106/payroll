const express = require('express');

const branchControllers = require('../controllers/branch');

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/' , authUser, getPermissions, isAdmin, branchControllers.getBranch);

router.post('/' , authUser, getPermissions, isAdmin, branchControllers.postBranch);

router.put('/' , authUser, getPermissions, isAdmin, branchControllers.putBranch);

router.delete('/' , authUser, getPermissions, isAdmin, branchControllers.deleteBranch);

module.exports = router;
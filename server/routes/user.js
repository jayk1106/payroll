const express = require('express');

const userControllers = require('../controllers/user');
const authUser = require('../middlewares/auth-user');

const router = express.Router();

//  ==> /api/v1/user - GET
router.get('/' , userControllers.getUser);

router.post('/' , userControllers.postUser);

router.put('/' , authUser , userControllers.putUser);

router.delete('/' , authUser , userControllers.deleteUser);

router.post('/login' , userControllers.loginUser);

module.exports = router;
const express = require('express');

const generalControllers = require('../controllers/general');

const router = express.Router();

router.get('/dashboard', generalControllers.getDashboard);

router.get('/form-select-values/:orgId' , generalControllers.getFormSelectValues);

module.exports = router;
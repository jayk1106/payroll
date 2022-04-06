const express = require('express');

const taxControllers = require('../controllers/tax');

const router = express.Router();

router.get('/', taxControllers.getTaxes);

router.post('/' , taxControllers.postTax);

router.put('/' , taxControllers.putTax);

router.delete('/:id',taxControllers.deleteTax);

module.exports = router;
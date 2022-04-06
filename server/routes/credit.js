const express = require('express');

const creditControllers = require('../controllers/credit');

const router = express.Router();

router.get('/:empId' , creditControllers.getCredits);

router.post('/' , creditControllers.postCredit);

router.put('/' , creditControllers.putCredits);

router.delete('/:id' , creditControllers.deleteCredit);

module.exports = router;
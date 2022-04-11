const express = require('express');

const creditControllers = require('../controllers/credit');

const router = express.Router();

router.get('/all/:orgId' , creditControllers.getAllOrganizationsCredits);

router.get('/:empId' , creditControllers.getCredits);

router.put('/settle/:creditId', creditControllers.putSettleCredit);
 
// router.put('/reject/:creditId', creditControllers);

router.post('/' , creditControllers.postCredit);

router.put('/' , creditControllers.putCredits);

router.delete('/:id' , creditControllers.deleteCredit);

module.exports = router;
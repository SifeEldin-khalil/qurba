const router       = require('express').Router();
const restrantOps  = require('../controllers/restaurants.op');

// User Routes=======================
router.get('/restaurants', restrantOps.getRestrants)

// Expot Routes=======================
module.exports = router
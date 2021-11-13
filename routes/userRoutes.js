const router  = require('express').Router();
const userOps = require('../controllers/users.op');

// User Routes=======================
router.post('/createUser', userOps.createUser)

router.get('/user/:_id', userOps.getUser)

router.post('/updateUser', userOps.updateUser)

router.get('/deleteUser/:_id', userOps.deleteUser)

router.get('/users', userOps.getUsers)

router.get('/updateUserCuisines', userOps.updateUserCuisines)

// Expot Routes=======================
module.exports = router
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const contactInfoController = require('../controllers/ContactInfoController');
const availabilityController = require('../controllers/AvailabilityController');

router.get('/', (req, res) => {
    res.send('GET request to the homepage');
});

// Route POST pour créer un nouvel utilisateur
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/whoAmI', userController.verifyUser);


module.exports = router;
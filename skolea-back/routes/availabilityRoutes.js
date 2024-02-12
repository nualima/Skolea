const express = require('express');
const router = express.Router();
const availabilities = require('../controllers/availabilities');

router.get('/', (req, res) => {
    res.send('GET request to the homepage');
});

router.get('/availabilities', availabilityController.getAllAvailabilities);
router.get('/availabilities/:id', availabilityController.getAvailabilityById);
router.post('/availabilities', availabilityController.createAvailability);
router.put('/availabilities/:id', availabilityController.updateAvailability);
router.delete('/availabilities/:id', availabilityController.deleteAvailability);

module.exports = router;
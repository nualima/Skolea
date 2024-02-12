const express = require('express');
const router = express.Router();
const contactSubmissionController = require('../controllers/ContactSubmissionController');

router.get('/', (req, res) => {
    res.send('GET request to the homepage');
});

router.get('/contactsubmissions', contactSubmissionController.getAllContactSubmissions);
router.get('/contactsubmissions/:id', contactSubmissionController.getContactSubmissionById);
router.post('/contactsubmissions', contactSubmissionController.createContactSubmission);
router.put('/contactsubmissions/:id', contactSubmissionController.updateContactSubmission);
router.delete('/contactsubmissions/:id', contactSubmissionController.deleteContactSubmission);

module.exports = router;
const express = require('express');
const router = express.Router();
const contactinfo = require('../controllers/contactinfo');

router.get('/', (req, res) => {
    res.send('GET request to the homepage');
});

router.get('/contactinfo', contactInfoController.getAllContactInfo);
router.get('/contactinfo/:id', contactInfoController.getContactInfoById);
router.post('/contactinfo', contactInfoController.createContactInfo);
router.put('/contactinfo/:id', contactInfoController.updateContactInfo);
router.delete('/contactinfo/:id', contactInfoController.deleteContactInfo);

module.exports = router;
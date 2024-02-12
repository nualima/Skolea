const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');

router.get('/', (req, res) => {
    res.send('GET request to the homepage');
});

router.get('/messages', messageController.getAllMessages);
router.get('/messages/:id', messageController.getMessageById);
router.post('/messages', messageController.createMessage);
router.put('/messages/:id', messageController.updateMessage);
router.delete('/messages/:id', messageController.deleteMessage);

module.exports = router;
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentController');

router.get('/', (req, res) => {
    res.send('GET request to the homepage');
});

router.get('/students', studentController.getAllStudents);
router.get('/students/:id', studentController.getStudentById);
router.post('/students', studentController.createStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);


module.exports = router;
const express = require('express');
const router = express.Router();
const professorController = require('../controllers/ProfessorController');

router.get('/', (req, res) => {
    res.send('GET request to the homepage');
});

router.get('/professors', professorController.getAllProfessors);
router.get('/professors/:id', professorController.getProfessorById);
router.post('/professors', professorController.createProfessor);
router.put('/professors/:id', professorController.updateProfessor);
router.delete('/professors/:id', professorController.deleteProfessor);

module.exports = router;
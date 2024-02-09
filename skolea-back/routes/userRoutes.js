const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const professorController = require('../controllers/ProfessorController');
const studentController = require('../controllers/StudentController');
const sessionController = require('../controllers/SessionController');
const messageController = require('../controllers/MessageController');
const contactSubmissionController = require('../controllers/ContactSubmissionController');
const contactInfoController = require('../controllers/ContactInfoController');
const availabilityController = require('../controllers/AvailabilityController');

// Route POST pour créer un nouvel utilisateur
router.post('/signup', userController.createUser);

// Routes pour Professor
router.get('/professors', professorController.getAllProfessors);
router.get('/professors/:id', professorController.getProfessorById);
router.post('/professors', professorController.createProfessor);
router.put('/professors/:id', professorController.updateProfessor);
router.delete('/professors/:id', professorController.deleteProfessor);

// Routes pour Student
router.get('/students', studentController.getAllStudents);
router.get('/students/:id', studentController.getStudentById);
router.post('/students', studentController.createStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

// Routes pour Session
router.get('/sessions', sessionController.getAllSessions);
router.get('/sessions/:id', sessionController.getSessionById);
router.post('/sessions', sessionController.createSession);
router.put('/sessions/:id', sessionController.updateSession);
router.delete('/sessions/:id', sessionController.deleteSession);

// Routes pour Message
router.get('/messages', messageController.getAllMessages);
router.get('/messages/:id', messageController.getMessageById);
router.post('/messages', messageController.createMessage);
router.put('/messages/:id', messageController.updateMessage);
router.delete('/messages/:id', messageController.deleteMessage);

// Routes pour ContactSubmission
router.get('/contactsubmissions', contactSubmissionController.getAllContactSubmissions);
router.get('/contactsubmissions/:id', contactSubmissionController.getContactSubmissionById);
router.post('/contactsubmissions', contactSubmissionController.createContactSubmission);
router.put('/contactsubmissions/:id', contactSubmissionController.updateContactSubmission);
router.delete('/contactsubmissions/:id', contactSubmissionController.deleteContactSubmission);

// Routes pour ContactInfo
router.get('/contactinfo', contactInfoController.getAllContactInfo);
router.get('/contactinfo/:id', contactInfoController.getContactInfoById);
router.post('/contactinfo', contactInfoController.createContactInfo);
router.put('/contactinfo/:id', contactInfoController.updateContactInfo);
router.delete('/contactinfo/:id', contactInfoController.deleteContactInfo);

// Routes pour Availability
router.get('/availabilities', availabilityController.getAllAvailabilities);
router.get('/availabilities/:id', availabilityController.getAvailabilityById);
router.post('/availabilities', availabilityController.createAvailability);
router.put('/availabilities/:id', availabilityController.updateAvailability);
router.delete('/availabilities/:id', availabilityController.deleteAvailability);

module.exports = router;
const { sequelize, User, Student, Professor } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

// Middleware pour valider la création de l'utilisateur
const validateCreateUser = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("role").custom((value, { req }) => {
    if (value === "professor" && (!req.body.subjectIds || req.body.subjectIds.length === 0)) {
      throw new Error();
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    next();
  },
];

// Fonction générique pour créer un utilisateur
const createUser = async (userData, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { password, subjectIds, educationLevelId, ...userInfo } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...userInfo, password: hashedPassword }, { transaction });
    await createStudentOrProfessor(userInfo.role, newUser.id, userInfo.role === "student" ? educationLevelId : subjectIds, transaction);
    await transaction.commit();
    return { success: true, id: newUser.id };
  } catch (error) {
    await transaction.rollback();
    return { success: false, error: error.message };
  }
};

// Fonctions pour la création d'étudiants ou de professeurs
const createStudentOrProfessor = async (role, userId, data, transaction) => {
  if (role === "student") {
    await Student.create({ userId, educationLevelId: data }, { transaction });
  } else if (role === "professor" && data && data.length > 0) {
    const professor = await Professor.create({ userId }, { transaction });
    await professor.addSubjects(data, { transaction });
  }
};

// Middleware pour la création d'utilisateurs
const handleCreateUser = async (req, res) => {
  const result = await createUser(req.body, res);
  if (result.success) {
    res.status(201).json({ id: result.id });
  } else {
    res.status(500).json({ error: result.error });
  }
};

// Fonction pour créer des utilisateurs administrateurs
const createAdminUsers = async (req, res) => {
  try {
    // Existing admin users creation
    await createUser({
      email: 'contact@skolea.fr',
      password: 'azerty123',
      name: 'contact message',
      role: 'admin',
      birthday: '1998-03-18',
      phoneNumber: '0168716774',
      profilePicture: 'url_de_ta_photo_de_profil'
    }, res);

    await createUser({
      email: 'redwan.gharbi@hotmail.com',
      password: 'azerty123',
      name: 'redwan gharbi',
      role: 'admin',
      birthday: '1998-03-18',
      phoneNumber: '076871674',
      profilePicture: 'url_de_ta_photo_de_profil'
    }, res);

    // New student and professor users creation
    await createUser({
      email: "student@example.com",
      password: "studentPassword123",
      name: "Student Name",
      role: "student",
      educationLevel: "CP",
      birthday: "2000-01-01",
      phoneNumber: "0000000000",
      profilePicture: "url_to_student_profile_picture"
    }, res);

    await createUser({
      email: "professor@example.com",
      password: "professorPassword123",
      name: "Professor Name",
      role: "professor",
      price: "50.00",
      subjects: "Sciences",
      bio: "A brief bio of the professor",
      birthday: "1980-01-01",
      phoneNumber: "1111111111",
      profilePicture: "url_to_professor_profile_picture"
    }, res);

    res.status(201).send('All users created successfully');
  } catch (error) {
    console.error('Error creating users:', error);
    res.status(500).json({ error: error.message });
  }
};


// Middleware pour la connexion d'un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).end();
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token, id: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware pour vérifier l'utilisateur à l'aide du token JWT
const verifyUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).end();
    }
    res.json({ id: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleCreateUser, createAdminUsers, loginUser, verifyUser };

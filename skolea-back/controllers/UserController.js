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

// Fonctions pour la création d'étudiants ou de professeurs
const createStudentOrProfessor = async (role, userId, data, transaction) => {
  if (role === "student") {
    await Student.create({ userId, educationLevelId: data }, { transaction });
  } else if (role === "professor" && data && data.length > 0) {
    const professor = await Professor.create({ userId }, { transaction });
    await professor.addSubjects(data, { transaction });
  }
};

const createUser = [
  validateCreateUser,
  async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { password, subjectIds, educationLevelId, ...userData } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ ...userData, password: hashedPassword }, { transaction });
      await createStudentOrProfessor(userData.role, newUser.id, userData.role === "student" ? educationLevelId : subjectIds, transaction);

      await transaction.commit();
      res.status(201).json({ id: newUser.id });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: error.message });
    }
  },
];

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

module.exports = { createUser, loginUser, verifyUser };

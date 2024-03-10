const { sequelize, User, Student, Professor } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const professorController = require("../controllers/ProfessorController");
require("dotenv").config();
const models = require("../models"); // Ajustez le chemin selon la structure de votre projet

// Middleware pour valider la création de l'utilisateur
const validateCreateUser = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("role").custom((value, { req }) => {
    if (
      value === "professor" &&
      (!req.body.subjectIds || req.body.subjectIds.length === 0)
    ) {
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
    const { password, subjectIds, educationLevelId, cityNames, ...userInfo } =
      userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(
      { ...userInfo, password: hashedPassword },
      { transaction }
    );

    // Passer 'subjectIds', 'cityNames', etc., selon le rôle
    await createStudentOrProfessor(
      userInfo.role,
      newUser.id,
      {
        subjectIds,
        educationLevelId,
        price: userData.price,
        bio: userData.bio,
        cityNames,
      },
      transaction
    );

    await transaction.commit();
    return { success: true, id: newUser.id };
  } catch (error) {
    console.error("Error during user creation:", error);
    await transaction.rollback();
    return { success: false, error: error.message };
  }
};

// Fonctions pour la création d'étudiants ou de professeurs
const createStudentOrProfessor = async (role, userId, data, transaction) => {
  if (role === "student") {
    await Student.create(
      { userId, educationLevelId: data.educationLevelId },
      { transaction }
    );
  } else if (role === "professor") {
    await professorController.createProfessorWithCity(
      {
        userId,
        ...data, // s'assure que cela inclut price, subjects, bio, et cityNames
      },
      transaction
    );
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
    await createUser(
      {
        email: "contact@skolea.fr",
        password: "azerty123",
        name: "contact message",
        role: "admin",
        birthday: "1998-03-18",
        phoneNumber: "0168716774",
        profilePicture: "url_de_ta_photo_de_profil",
      },
      res
    );

    await createUser(
      {
        email: "redwan.gharbi@hotmail.com",
        password: "azerty123",
        name: "redwan gharbi",
        role: "admin",
        birthday: "1998-03-18",
        phoneNumber: "076871674",
        profilePicture: "url_de_ta_photo_de_profil",
      },
      res
    );

    // New student and professor users creation
    await createUser(
      {
        email: "student@example.com",
        password: "studentPassword123",
        name: "Student Name",
        role: "student",
        educationLevel: "CP",
        birthday: "2000-01-01",
        phoneNumber: "0000000000",
        profilePicture: "url_to_student_profile_picture",
      },
      res
    );

    await createUser(
      {
        email: "professor@example.com",
        password: "professorPassword123",
        name: "Professor Name",
        role: "professor",
        price: "50.00",
        subjects: "Sciences",
        bio: "A brief bio of the professor",
        birthday: "1980-01-01",
        phoneNumber: "1111111111",
        profilePicture: "url_to_professor_profile_picture",
      },
      res
    );

    res.status(201).send("All users created successfully");
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).json({ error: error.message });
  }
};

// Middleware pour la connexion d'un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Récupérer l'utilisateur sans exclure le mot de passe pour la comparaison
    let user = await models.User.findOne({
      where: { email },
    });

    // Vérifier que l'utilisateur existe et que le mot de passe est fourni
    if (!user || !password) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }

    // Comparer le mot de passe fourni avec celui stocké dans la base de données
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Préparer les données utilisateur à renvoyer
    // Supprimer le mot de passe de l'objet avant de renvoyer la réponse
    const userData = { ...user.toJSON() };
    delete userData.password;

    // Si l'utilisateur est un professeur, ajoutez des informations spécifiques
    if (user.role === "professor") {
      const professorData = await models.Professor.findOne({
        where: { userId: user.id },
        include: [models.Subject],
      });

      if (professorData) {
        userData.professor = {
          price: professorData.price,
          bio: professorData.bio,
          subjects: professorData.Subjects.map((subject) => subject.name),
        };
      }
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware pour vérifier l'utilisateur à l'aide du token JWT
const whoAmI = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Récupérez l'utilisateur sans inclure les matières directement
    let user = await models.User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] }, // Exclure le mot de passe dès la requête
    });

    if (!user) {
      return res.status(404).end();
    }

    // Si l'utilisateur est un professeur, ajoutez les informations spécifiques au professeur
    if (user.role === "professor") {
      const professorData = await models.Professor.findOne({
        where: { userId: user.id },
        include: [models.Subject],
      });

      if (professorData) {
        // Ajoutez directement les informations spécifiques au professeur dans l'objet `user`
        user.setDataValue("professor", {
          price: professorData.price,
          bio: professorData.bio,
          subjects: professorData.Subjects.map((subject) => subject.name),
        });
      }
    }

    res.json({ user }); // Envoyer directement l'objet `user` modifié
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  validateCreateUser,
  handleCreateUser,
  createAdminUsers,
  loginUser,
  whoAmI,
};

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
      (!req.body.subjects || req.body.subjects.length === 0)
    ) {
      throw new Error("Subjects are required for professor role");
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
    const { password, ...userInfo } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(
      { ...userInfo, password: hashedPassword },
      { transaction }
    );

    await createStudentOrProfessor(
      userInfo.role,
      newUser.id,
      userData,
      transaction
    );

    await transaction.commit();
    return { success: true, id: newUser.id };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Fonctions pour la création d'étudiants ou de professeurs
const createStudentOrProfessor = async (role, userId, data, transaction) => {
  if (role === "student") {
    const educationLevelName = data.educationLevel;

    if (!educationLevelName) {
      throw new Error("Education level name is required");
    }

    const educationLevel = await models.EducationLevel.findOne({
      where: { name: educationLevelName },
      transaction,
    });

    if (!educationLevel) {
      throw new Error(`Education level '${educationLevelName}' not found`);
    }

    await models.Student.create(
      { userId, educationLevelId: educationLevel.id },
      { transaction }
    );
  } else if (role === "professor") {
    const professorData = {
      userId,
      ...data,
    };

    const professor = await professorController.createProfessorWithCity(
      professorData,
      transaction
    );

    if (data.subjects && data.subjects.length > 0) {
      await professorController.associateSubjectsToProfessor(
        professor.id,
        data.subjects,
        transaction
      );
    }
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
    let user = await models.User.findOne({
      where: { email },
    });

    if (!user || !password) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Supprimer le mot de passe de l'objet avant de renvoyer la réponse
    const userData = { ...user.toJSON() };
    delete userData.password;

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
    } else if (user.role === "student") {
      const studentData = await models.Student.findOne({
        where: { userId: user.id },
        include: [models.EducationLevel],
      });

      if (studentData && studentData.EducationLevel) {
        userData.student = {
          educationLevel: studentData.EducationLevel.name,
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

    let user = await models.User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: models.Professor,
          include: [models.Subject],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Preparer les données pour la réponse
    const userData = { ...user.toJSON() };
    if (userData.Professor) {
      userData.professor = {
        price: userData.Professor.price,
        subjects: userData.Professor.Subjects.map((s) => s.name),
        bio: userData.Professor.bio,
      };
    }

    res.json({ user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour mettre à jour les détails de l'utilisateur
const updateUserDetails = async (req, res) => {
  const { userId } = req.params;
  const { name, birthday, phoneNumber, email, educationLevel } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateData = { name, birthday, phoneNumber, email };

    // Mettre à jour l'educationLevel uniquement si l'utilisateur est un étudiant
    if (user.role === "student" && educationLevel !== undefined) {
      const student = await models.Student.findOne({
        where: { userId: userId },
      });
      if (!student) {
        return res.status(404).json({ error: "Student profile not found" });
      }
      // Suppose that EducationLevel is a valid model and associated properly
      const eduLevel = await models.EducationLevel.findOne({
        where: { name: educationLevel },
      });
      if (eduLevel) {
        await student.update({ educationLevelId: eduLevel.id });
      }
    }

    await user.update(updateData);

    const updatedUser = await User.findByPk(userId, {
      include: [
        {
          model: Student,
          include: [models.EducationLevel],
        },
        {
          model: Professor,
          include: [models.Subject],
        },
      ],
    });

    res.status(200).json(updatedUser || user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  console.log("Attempting to fetch user with ID:", req.params.userId);
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      console.log("User not found for ID:", req.params.userId);
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  validateCreateUser,
  handleCreateUser,
  createAdminUsers,
  loginUser,
  whoAmI,
  updateUserDetails,
  getUserById,
};

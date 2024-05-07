// controllers/ContactInfoController.js
const { ContactInfo } = require("../models");

// Méthode pour récupérer toutes les informations de contact
const getAllContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.findAll();
    res.json(contactInfo);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de contact :",
      error
    );
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des informations de contact",
    });
  }
};

// Méthode pour créer de nouvelles informations de contact
const createContactInfo = async (req, res) => {
  const { userId, phone, address } = req.body;
  try {
    const contactInfo = await ContactInfo.create({ userId, phone, address });
    res.status(201).json(contactInfo);
  } catch (error) {
    console.error(
      "Erreur lors de la création des informations de contact :",
      error
    );
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la création des informations de contact",
    });
  }
};

// Méthode pour mettre à jour des informations de contact existantes
const updateContactInfo = async (req, res) => {
  const { id } = req.params;
  const { userId, phone, address } = req.body;
  try {
    const contactInfo = await ContactInfo.findByPk(id);
    if (!contactInfo) {
      return res
        .status(404)
        .json({ message: "Informations de contact non trouvées" });
    }
    contactInfo.userId = userId;
    contactInfo.phone = phone;
    contactInfo.address = address;
    await contactInfo.save();
    res.json(contactInfo);
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations de contact :",
      error
    );
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour des informations de contact",
    });
  }
};

// Méthode pour supprimer des informations de contact existantes
const deleteContactInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const contactInfo = await ContactInfo.findByPk(id);
    if (!contactInfo) {
      return res
        .status(404)
        .json({ message: "Informations de contact non trouvées" });
    }
    await contactInfo.destroy();
    res.json({ message: "Informations de contact supprimées avec succès" });
  } catch (error) {
    console.error(
      "Erreur lors de la suppression des informations de contact :",
      error
    );
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression des informations de contact",
    });
  }
};

module.exports = {
  deleteContactInfo,
  updateContactInfo,
  createContactInfo,
  getAllContactInfo,
};

import User from "../Models/User.js";

export const getALLUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Accès refusé",
      });
    }

    const users = await User.findAll({
      where: {
        role: "etudiant",
      },
    });

    res.status(200).json({
      success: true,
      data: { users },
    });
  } catch (error) {
    console.error("Erreur récupération utilisateurs:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des utilisateurs",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }
    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error("Erreur récupération utilisateur:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de l'utilisateur",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }
    await user.destroy();
    res.status(200).json({
      success: true,
      message: "Utilisateur supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur suppression utilisateur:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de l'utilisateur",
      error: error.message,
    });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { nom, email } = req.body;

    if (req.user.role !== "admin" && req.body.role) {
      return res.status(403).json({
        success: false,
        message: "Modification du rôle interdite",
      });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    await user.update({ nom, email });

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur mise à jour utilisateur",
      error: error.message,
    });
  }
};

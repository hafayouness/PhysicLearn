import Course from "../Models/Course.js";
import { Op } from "sequelize";
import { Lesson } from "../Models/index.js";
import Quiz from "../Models/Quiz.js";

export const getAllCourses = async (req, res) => {
  try {
    const {
      niveau,
      categorie,
      search,
      page = 1,
      limit = 10,
      actif,
    } = req.query;
    const offset = (page - 1) * limit;

    const where = {};

    if (niveau) where.niveau = niveau;
    if (categorie) where.categorie = categorie;
    if (actif !== undefined) where.actif = actif === "true";

    if (search) {
      where[Op.or] = [
        { titre: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Course.findAndCountAll({
      where,
      include: [
        {
          model: Lesson,
          as: "lessons",
          attributes: ["id", "titre", "ordre", "duree"],
        },
        {
          model: Quiz,
          as: "quizzes",
          attributes: ["id", "titre", "ordre"],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [
        ["ordre", "ASC"],
        ["created_at", "DESC"],
      ],
    });

    res.status(200).json({
      success: true,
      message: "Cours récupérés avec succès",
      data: {
        courses: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit),
        },
      },
    });
  } catch (error) {
    console.error("Erreur getAllCourses:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des cours",
      error: error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id, {
      include: [
        {
          model: Lesson,
          as: "lessons",
          order: [["ordre", "ASC"]],
        },
        {
          model: Quiz,
          as: "quizzes",
          order: [["ordre", "ASC"]],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cours récupéré avec succès",
      data: course,
    });
  } catch (error) {
    console.error("Erreur getCourseById:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du cours",
      error: error.message,
    });
  }
};

export const CreateCourse = async (req, res) => {
  try {
    const {
      titre,
      description,
      categorie,
      niveau,
      image,
      fichiers,
      duree_estimee,
      ordre,
    } = req.body;
    if (!titre || !categorie || !niveau) {
      return res.status(400).json({
        success: false,
        message: "Titre, catégorie et niveau sont requis",
      });
    }
    const course = await Course.create({
      titre,
      description,
      categorie,
      niveau,
      image,
      fichiers: fichiers || [],
      duree_estimee: duree_estimee || 0,
      ordre: ordre || 0,
    });
    res.status(201).json({
      success: true,
      message: "Cours créé avec succès",
      course,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du cours",
      error: err.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titre,
      description,
      categorie,
      niveau,
      image,
      fichiers,
      duree_estimee,
      ordre,
    } = req.body;
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }
    await course.update({
      titre: titre || course.titre,
      description: description || course.description,
      categorie: categorie || course.categorie,
      niveau: niveau || course.niveau,
      image: image || course.image,
      fichiers: fichiers || course.fichiers,
      duree_estimee: duree_estimee || course.duree_estimee,
      ordre: ordre || course.ordre,
    });
    res.status(200).json({
      success: true,
      message: "Cours mis à jour avec succès",
      course,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du cours",
      error: err.message,
    });
  }
};
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }
    await course.destroy();
    res.status(200).json({
      success: true,
      message: "Cours supprimé avec succès",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression du cours",
      error: err.message,
    });
  }
};

export default {
  getAllCourses,
  getCourseById,
  CreateCourse,
  updateCourse,
  deleteCourse,
};

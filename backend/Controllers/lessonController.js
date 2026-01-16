import { Course, Lesson } from "../Models/index.js";

export const getAllLessons = async (req, res) => {
  try {
    const { id_course, actif } = req.query;

    const where = {};
    if (id_course) where.id_course = id_course;
    if (actif !== undefined) where.actif = actif === "true";

    const lessons = await Lesson.findAll({
      where,
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["id", "titre", "niveau"],
        },
      ],
      order: [["ordre", "ASC"]],
    });

    res.status(200).json({
      success: true,
      message: "Leçons récupérées avec succès",
      data: lessons,
    });
  } catch (error) {
    console.error("Erreur getAllLessons:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des leçons",
      error: error.message,
    });
  }
};
export const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findByPk(id, {
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["id", "titre", "niveau", "categorie"],
        },
      ],
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Leçon non trouvée",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leçon récupérée avec succès",
      data: lesson,
    });
  } catch (error) {
    console.error("Erreur getLessonById:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de la leçon",
      error: error.message,
    });
  }
};
export const createLesson = async (req, res) => {
  try {
    const {
      titre,
      contenu,
      id_course,
      type_contenu,
      video_url,
      fichiers,
      duree,
      ordre,
    } = req.body;

    if (!titre || !contenu || !id_course) {
      return res.status(400).json({
        success: false,
        message: "Les champs titre, contenu et id_course sont obligatoires",
      });
    }

    const course = await Course.findByPk(id_course);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Le cours spécifié n'existe pas",
      });
    }
    const NewLesson = await Lesson.create({
      titre,
      contenu,
      id_course,
      type_contenu: type_contenu || "texte",
      video_url,
      fichiers: fichiers || [],
      duree: duree || 0,
      ordre: ordre || 0,
    });
    res.status(201).json({
      success: true,
      message: "Leçon créée avec succès",
      data: NewLesson,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la leçon :", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la création de la leçon",
      error: error.message,
    });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, contenu, type_contenu, video_url, fichiers, duree, ordre } =
      req.body;

    const lessonToUpdate = await Lesson.findByPk(id);
    if (!lessonToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Leçon non trouvée",
      });
    }
    await lessonToUpdate.update({
      titre: titre || lessonToUpdate.titre,
      contenu: contenu || lessonToUpdate.contenu,
      type_contenu: type_contenu || lessonToUpdate.type_contenu,
      video_url: video_url || lessonToUpdate.video_url,
      fichiers: fichiers || lessonToUpdate.fichiers,
      duree: duree || lessonToUpdate.duree,
      ordre: ordre || lessonToUpdate.ordre,
    });
    res.status(200).json({
      success: true,
      message: "Leçon mise à jour avec succès",
      data: lessonToUpdate,
    });
  } catch (error) {
    console.log("Erreur lors de la mise à jour de la leçon :", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la mise à jour de la leçon",
      error: error.message,
    });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const lessonToDelete = await Lesson.findByPk(id);
    if (!lessonToDelete) {
      return res.status(404).json({
        success: false,
        message: "Leçon non trouvée",
      });
    }
    await lessonToDelete.destroy();
    res.status(200).json({
      success: true,
      message: "Leçon supprimée avec succès",
    });
  } catch (error) {
    console.log("Erreur lors de la suppression de la leçon :", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la suppression de la leçon",
      error: error.message,
    });
  }
};

import Course from "../Models/Course.js";

export const GetAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json({
      success: true,
      courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des cours",
      error: err.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }
    res.status(200).json({
      success: true,
      course,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du cours",
      error: err.message,
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
  GetAllCourses,
  getCourseById,
  CreateCourse,
  updateCourse,
  deleteCourse,
};

import { Quiz, Course } from "../Models/index.js";

export const getAllQuizzes = async (req, res) => {
  try {
    const { id_course, actif } = req.query;

    const where = {};
    if (id_course) where.id_course = id_course;
    if (actif !== undefined) where.actif = actif === "true";

    const quizzes = await Quiz.findAll({
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
      message: "Quiz récupérés avec succès",
      data: quizzes,
    });
  } catch (error) {
    console.error("Erreur getAllQuizzes:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des quiz",
      error: error.message,
    });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findByPk(id, {
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["id", "titre", "niveau", "categorie"],
        },
      ],
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quiz récupéré avec succès",
      data: quiz,
    });
  } catch (error) {
    console.error("Erreur getQuizById:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du quiz",
      error: error.message,
    });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const {
      titre,
      description,
      id_course,
      questions,
      duree,
      note_passage,
      ordre,
    } = req.body;
    console.log(req.body);

    if (!titre || !id_course || !questions || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Titre, ID du cours et questions sont requis",
      });
    }

    const course = await Course.findByPk(id_course);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    const quiz = await Quiz.create({
      titre,
      description,
      id_course,
      questions,
      duree: duree || 30,
      note_passage: note_passage || 60,
      ordre: ordre || 0,
    });

    res.status(201).json({
      success: true,
      message: "Quiz créé avec succès",
      data: quiz,
    });
  } catch (error) {
    console.error("Erreur createQuiz:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du quiz",
      error: error.message,
    });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, questions, duree, note_passage, ordre, actif } =
      req.body;

    const quiz = await Quiz.findByPk(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz non trouvé",
      });
    }

    await quiz.update({
      titre: titre || quiz.titre,
      description: description !== undefined ? description : quiz.description,
      questions: questions || quiz.questions,
      duree: duree !== undefined ? duree : quiz.duree,
      note_passage:
        note_passage !== undefined ? note_passage : quiz.note_passage,
      ordre: ordre !== undefined ? ordre : quiz.ordre,
      actif: actif !== undefined ? actif : quiz.actif,
    });

    res.status(200).json({
      success: true,
      message: "Quiz mis à jour avec succès",
      data: quiz,
    });
  } catch (error) {
    console.error("Erreur updateQuiz:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du quiz",
      error: error.message,
    });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findByPk(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz non trouvé",
      });
    }

    await quiz.destroy();

    res.status(200).json({
      success: true,
      message: "Quiz supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur deleteQuiz:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression du quiz",
      error: error.message,
    });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { reponses } = req.body;
    const userId = req.user.id;

    if (!reponses || !Array.isArray(reponses)) {
      return res.status(400).json({
        success: false,
        message: "Réponses invalides",
      });
    }

    const quiz = await Quiz.findByPk(id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz non trouvé",
      });
    }

    let score = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach((question, index) => {
      const userAnswer = reponses[index];
      if (userAnswer === question.reponse_correcte) {
        score++;
      }
    });

    const scorePercentage = Math.round((score / totalQuestions) * 100);

    // const [progress, created] = await Progress.findOrCreate({
    //   where: {
    //     id_user: userId,
    //     id_quiz: id,
    //   },
    //   defaults: {
    //     score_quiz: scorePercentage,
    //     reponses,
    //     nombre_tentatives: 1,
    //     derniere_tentative: new Date(),
    //   },
    // });

    // if (!created) {
    //   await progress.update({
    //     score_quiz: scorePercentage,
    //     reponses,
    //     nombre_tentatives: progress.nombre_tentatives + 1,
    //     derniere_tentative: new Date(),
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Quiz soumis avec succès",
      data: {
        score: scorePercentage,
        reussi: scorePercentage >= quiz.note_passage,
        bonnes_reponses: score,
        total_questions: totalQuestions,
        tentative: progress.nombre_tentatives,
      },
    });
  } catch (error) {
    console.error("Erreur submitQuiz:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la soumission du quiz",
      error: error.message,
    });
  }
};

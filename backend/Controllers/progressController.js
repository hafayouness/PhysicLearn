import { Progress, User, Lesson, Quiz, Course } from "../Models/index.js";

import { Op } from "sequelize";
import sequelize from "../config/db.js";

export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const progress = await Progress.findAll({
      where: { id_user: userId },
      include: [
        {
          model: Lesson,
          as: "lesson",
          include: [
            {
              model: Course,
              as: "course",
              attributes: ["id", "titre", "niveau"],
            },
          ],
        },
        {
          model: Quiz,
          as: "quiz",
          include: [
            {
              model: Course,
              as: "course",
              attributes: ["id", "titre", "niveau"],
            },
          ],
        },
      ],
      order: [["updated_at", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Progression récupérée avec succès",
      data: progress,
    });
  } catch (error) {
    console.error("Erreur getUserProgress:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de la progression",
      error: error.message,
    });
  }
};

export const markLessonComplete = async (req, res) => {
  try {
    const { id_lesson } = req.body;
    const userId = req.user.id;

    if (!id_lesson) {
      return res.status(400).json({
        success: false,
        message: "ID de la leçon requis",
      });
    }

    const lesson = await Lesson.findByPk(id_lesson);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Leçon non trouvée",
      });
    }

    const [progress, created] = await Progress.findOrCreate({
      where: {
        id_user: userId,
        id_lesson: id_lesson,
      },
      defaults: {
        lecon_terminee: true,
        derniere_tentative: new Date(),
      },
    });

    if (!created) {
      await progress.update({
        lecon_terminee: true,
        derniere_tentative: new Date(),
      });
    }

    res.status(200).json({
      success: true,
      message: "Leçon marquée comme terminée",
      data: progress,
    });
  } catch (error) {
    console.error("Erreur markLessonComplete:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour de la progression",
      error: error.message,
    });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [lessonsCompleted, quizzesTaken] = await Promise.all([
      Progress.count({
        where: {
          id_user: userId,
          lecon_terminee: true,
          id_lesson: { [Op.ne]: null },
        },
      }),
      Progress.count({
        where: {
          id_user: userId,
          id_quiz: { [Op.ne]: null },
        },
      }),
    ]);

    const avgScore = await Progress.findOne({
      where: {
        id_user: userId,
        score_quiz: { [Op.ne]: null },
      },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("score_quiz")), "average_score"],
      ],
      raw: true,
    });

    res.status(200).json({
      success: true,
      message: "Statistiques récupérées avec succès",
      data: {
        lecons_terminees: lessonsCompleted,
        quiz_passes: quizzesTaken,
        score_moyen: Math.round(avgScore?.average_score || 0),
      },
    });
  } catch (error) {
    console.error("Erreur getUserStats:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des statistiques",
      error: error.message,
    });
  }
};

export const getAllProgress = async (req, res) => {
  try {
    const { id_user, id_course } = req.query;

    const where = {};
    if (id_user) where.id_user = id_user;

    const include = [
      {
        model: User,
        as: "user",
        attributes: ["id", "nom", "email"],
      },
      {
        model: Lesson,
        as: "lesson",
        include: [
          {
            model: Course,
            as: "course",
            attributes: ["id", "titre", "niveau"],
          },
        ],
      },
      {
        model: Quiz,
        as: "quiz",
        include: [
          {
            model: Course,
            as: "course",
            attributes: ["id", "titre", "niveau"],
          },
        ],
      },
    ];

    const progress = await Progress.findAll({
      where,
      include,
      order: [["updated_at", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Progression récupérée avec succès",
      data: progress,
    });
  } catch (error) {
    console.error("Erreur getAllProgress:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de la progression",
      error: error.message,
    });
  }
};

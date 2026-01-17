import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Quiz = sequelize.define(
  "Quiz",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titre: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le titre est requis" },
        len: {
          args: [3, 200],
          msg: "Le titre doit contenir entre 3 et 200 caractères",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_course: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    questions: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
      validate: {
        isValidQuestions(value) {
          if (!Array.isArray(value)) {
            throw new Error("Les questions doivent être un tableau");
          }
          if (value.length === 0) {
            throw new Error("Au moins une question est requise");
          }
        },
      },
    },
    duree: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 30,
    },
    note_passage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 60,
    },
    ordre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    actif: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "quizzes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Quiz;

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Progress = sequelize.define(
  "Progress",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    id_lesson: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "lessons",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    id_quiz: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "quizzes",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    lecon_terminee: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    score_quiz: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
    },
    temps_passe: {
      type: DataTypes.INTEGER, // en secondes
      allowNull: true,
      defaultValue: 0,
    },
    nombre_tentatives: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    derniere_tentative: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reponses: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    tableName: "progress",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["id_user", "id_lesson"],
        where: {
          id_lesson: { [sequelize.Sequelize.Op.ne]: null },
        },
      },
      {
        unique: true,
        fields: ["id_user", "id_quiz"],
        where: {
          id_quiz: { [sequelize.Sequelize.Op.ne]: null },
        },
      },
    ],
  },
);

export default Progress;

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Lesson = sequelize.define(
  "Lesson",
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
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le contenu est requis" },
      },
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
    type_contenu: {
      type: DataTypes.ENUM("texte", "video", "pdf", "mixte"),
      defaultValue: "texte",
    },
    video_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    fichiers: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("fichiers");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("fichiers", JSON.stringify(value));
      },
    },
    duree: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
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
    tableName: "lessons",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Lesson;

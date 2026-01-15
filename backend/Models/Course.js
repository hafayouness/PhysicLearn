import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Course = sequelize.define(
  "Course",
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
    categorie: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La catégorie est requise" },
      },
    },
    niveau: {
      type: DataTypes.ENUM("1ère Bac", "2ème Bac"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["1ère Bac", "2ème Bac"]],
          msg: "Le niveau doit être 1ère Bac ou 2ème Bac",
        },
      },
    },
    image: {
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
    duree_estimee: {
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
    tableName: "courses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Course;

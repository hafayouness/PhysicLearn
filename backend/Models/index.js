import User from "./User.js";
import Course from "./Course.js";
import Lesson from "./Lesson.js";
import Quiz from "./Quiz.js";
import Progress from "../Models/Progress.js";

Course.hasMany(Lesson, {
  foreignKey: "id_course",
  as: "lessons",
  onDelete: "CASCADE",
});
Lesson.belongsTo(Course, {
  foreignKey: "id_course",
  as: "course",
});

Course.hasMany(Quiz, {
  foreignKey: "id_course",
  as: "quizzes",
  onDelete: "CASCADE",
});
Quiz.belongsTo(Course, {
  foreignKey: "id_course",
  as: "course",
});
User.hasMany(Progress, {
  foreignKey: "id_user",
  as: "progress",
  onDelete: "CASCADE",
});
Progress.belongsTo(User, {
  foreignKey: "id_user",
  as: "user",
});

Lesson.hasMany(Progress, {
  foreignKey: "id_lesson",
  as: "progress",
  onDelete: "CASCADE",
});
Progress.belongsTo(Lesson, {
  foreignKey: "id_lesson",
  as: "lesson",
});

Quiz.hasMany(Progress, {
  foreignKey: "id_quiz",
  as: "progress",
  onDelete: "CASCADE",
});
Progress.belongsTo(Quiz, {
  foreignKey: "id_quiz",
  as: "quiz",
});
export { User, Course, Lesson, Quiz, Progress };

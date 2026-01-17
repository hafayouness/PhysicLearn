import User from "./User.js";
import Course from "./Course.js";
import Lesson from "./Lesson.js";
import Quiz from "./Quiz.js";
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

export { User, Course, Lesson, Quiz };

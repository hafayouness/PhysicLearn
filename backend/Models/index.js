import User from "./User.js";
import Course from "./Course.js";
import Lesson from "./Lesson.js";

Course.hasMany(Lesson, {
  foreignKey: "id_course",
  as: "lessons",
  onDelete: "CASCADE",
});
Lesson.belongsTo(Course, {
  foreignKey: "id_course",
  as: "course",
});

export { User, Course, Lesson };

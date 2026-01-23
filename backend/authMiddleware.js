export const protect = (req, res, next) => {
  req.user = { id: 1, role: "etudiant" };
  next();
};

export const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

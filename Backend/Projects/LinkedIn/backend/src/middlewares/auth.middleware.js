import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Normalize: jwt.sign used { id: ... }, so decoded.id is the user's _id string.
    // We explicitly expose it as req.user.id so every controller can rely on that name.
    req.user = {
      id: decoded.id,      // This is what your controllers use
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default auth;
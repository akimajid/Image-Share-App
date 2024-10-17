const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;

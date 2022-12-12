const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.jsx");

const requiresAuth = async (req, res, next) => {
  const token = req.cookies["access_token"];

  if (!token) {
    return res
      .status(401)
      .send("Votre session a expiré, veuillez vous connecter !");
  }

  try {
    const userId = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(userId);

    const userData = { ...user._doc };
    delete userData.password;
    req.user = userData;

    next();
  } catch (error) {
    res.status(400).send("Token introuvable, Invalide token");
  }
};

module.exports = requiresAuth;

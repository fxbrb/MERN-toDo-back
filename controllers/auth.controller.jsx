const { User } = require("../models/user.model.jsx");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateRegisterInput = require("../validation/registerValidation.jsx");

const registerUser = async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Verification si l'utilisateur ne s'inscrit pas avec un email déja utiliser
    // Regex pour empêcher les doublons avec les majuscules
    const exist = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
    });
    if (exist) {
      return res.status(400).json({ message: "Utilisateur déja existant.." });
    }
    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // Création de l'utilisateur
    const user = new User({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      dateofBirth: req.body.dateofbirth,
      avatar: `${req.protocol}://${req.get("host")}/images/default_avatar.png`,
      password: hash,
    });
    await user.save();
    const userData = user._doc;
    // Génération du token
    const token = jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "7d" });

    // Envoie du cookie
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ token: token, user: user, message: "Inscription réussie." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    // Trouver l'utilisateur
    const user = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
    });

    if (!user) {
      return res.status(400).send({ message: "Identifiants Incorrects." });
    }
    // Verification du mot de passe
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(400).send({ message: "Password incorrect.." });
    }
    const userData = user._doc;
    // Génération du token
    const token = jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "7d" });

    // Envoie du cookie
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ token: token, user: user, message: "Login réussie." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }

  return res.json(req.user);
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("access_token");

    return res.json({
      message: "A bientot!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

module.exports = { registerUser, loginUser, getCurrentUser, logoutUser };

const { User } = require("../models/user.model.jsx");
const { ToDo } = require("../models/todo.model.jsx");

// Update user profile
const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      user: req.user._id,
      _id: req.params.id,
    });

    if (!user) {
      res.status(404).json({
        message: "Impossible de trouver l'utilisateur",
      });
    }

    const newInfos = await User.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        dateofBirth: req.body.dateofbirth,
        avatar: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : user.avatar,
      },
      {
        new: true,
      }
    );

    return res.json({ newInfos, message: "Profil mis a jour." });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      user: req.user._id,
      _id: req.params.id,
    });

    if (!user) {
      res.status(404).json({
        message: "Impossible de supprimer le compte, utilisateur introuvable",
      });
    }

    await User.findOneAndDelete({
      user: req.user._id,
      _id: req.params.id,
    });

    res.clearCookie("access_token");

    return res.json({ message: "Profil supprimer." });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

module.exports = { updateUser, deleteUser };

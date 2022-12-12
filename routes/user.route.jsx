const express = require("express");
const {
  updateUser,
  deleteUser,
} = require("../controllers/user.controller.jsx");
const requiresAuth = require("../middleware/auth.middleware.jsx");
const upload = require("../middleware/multer.config.jsx");
const router = express.Router();

router.put("/update/:id", requiresAuth, upload.single("avatar"), updateUser);
router.delete("/delete/:id", requiresAuth, deleteUser);

module.exports = router;

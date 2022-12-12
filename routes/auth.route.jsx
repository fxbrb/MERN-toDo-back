const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../controllers/auth.controller.jsx");
const requiresAuth = require("../middleware/auth.middleware.jsx");
const router = express.Router();

router.get("/current", requiresAuth, getCurrentUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/logout", requiresAuth, logoutUser);

module.exports = router;

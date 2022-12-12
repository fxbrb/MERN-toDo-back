const express = require("express");
const {
  getTodosOfCurrentUser,
  addTask,
  setTodoAsComplete,
  setTodoAsIncomplete,
  updateTask,
  deleteTodo,
} = require("../controllers/todo.controller.jsx");
const requiresAuth = require("../middleware/auth.middleware.jsx");
const router = express.Router();

router.get("/current", requiresAuth, getTodosOfCurrentUser);
router.post("/new", requiresAuth, addTask);
router.put("/:id/complete", requiresAuth, setTodoAsComplete);
router.put("/:id/incomplete", requiresAuth, setTodoAsIncomplete);
router.put("/:id", requiresAuth, updateTask);
router.delete("/:id", requiresAuth, deleteTodo);

module.exports = router;

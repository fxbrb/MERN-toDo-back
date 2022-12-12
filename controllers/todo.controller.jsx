const { ToDo } = require("../models/todo.model.jsx");

// get todos of current user
const getTodosOfCurrentUser = async (req, res) => {
  try {
    const completeTodos = await ToDo.find({
      user: req.user._id,
      is_complete: true,
    }).sort({
      completedAt: -1,
    });

    const incompleteTodos = await ToDo.find({
      user: req.user._id,
      is_complete: false,
    }).sort({
      createdAt: -1,
    });

    return res.json({ incomplete: incompleteTodos, complete: completeTodos });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

// add todo

const addTask = async (req, res) => {
  try {
    // if (!req.body.content.length) {
    //   return res.status(400).json({
    //     message: "Le champ content ne peut être vide.",
    //   });
    // }
    const storeTodo = new ToDo({
      user: req.user._id,
      task: req.body.task,
      is_complete: false,
    });

    await storeTodo.save();

    return res.json(storeTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

// set todo as complete
const setTodoAsComplete = async (req, res) => {
  try {
    const todo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.id,
    });

    if (!todo) {
      res.status(404).json({
        message: "Impossible de trouver votre todo",
      });
    }

    if (todo.is_complete) {
      return res.status(400).json({
        message:
          "Votre todo est déja effectuer, vous ne pouvez pas la modifier.",
      });
    }

    const updateTodo = await ToDo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        is_complete: true,
        completedAt: new Date(),
      },
      {
        new: true,
      }
    );

    return res.json(updateTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

// set todo as incomplete
const setTodoAsIncomplete = async (req, res) => {
  try {
    const todo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.id,
    });

    if (!todo) {
      res.status(404).json({
        message: "Impossible de trouver votre todo",
      });
    }

    if (!todo.is_complete) {
      return res.status(400).json({
        message:
          "Votre todo est déja non effectuer, vous ne pouvez pas la modifier.",
      });
    }

    const updateTodo = await ToDo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        is_complete: false,
        completedAt: null,
      },
      {
        new: true,
      }
    );

    return res.json(updateTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

// update todo content
const updateTask = async (req, res) => {
  try {
    if (!req.body.task.length) {
      return res.status(400).json({
        message: "Le champ content ne peut être vide.",
      });
    }

    const todo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.id,
    });

    if (!todo) {
      res.status(404).json({
        message: "Impossible de trouver votre todo",
      });
    }
    const updateTodo = await ToDo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        task: req.body.task,
      },
      {
        new: true,
      }
    );

    return res.json(updateTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

// delete todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.id,
    });
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Impossible de trouver votre todo" });
    }

    const removedTodo = await ToDo.findOneAndRemove({
      user: req.user._id,
      _id: req.params.id,
    });

    return res.json(removedTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getTodosOfCurrentUser,
  addTask,
  setTodoAsComplete,
  setTodoAsIncomplete,
  updateTask,
  deleteTodo,
};

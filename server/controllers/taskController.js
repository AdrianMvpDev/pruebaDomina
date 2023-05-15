const Task = require("../models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      user: req.user.id,
    });

    const task = await newTask.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Check task ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);

    // Check if ID is valid
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(500).send("Server error");
  }
};

const updateTaskById = async (req, res) => {
  const { title, description } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Check task ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const updateObj = {};
    if (title) updateObj.title = title;
    if (description) updateObj.description = description;

    task = await Task.findByIdAndUpdate(
      req.params.id,
      updateObj,
      { new: true } // Devuelve el documento actualizado
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);

    // Check if ID is valid
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(500).send("Server error");
  }
};


const deleteTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Check task ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const result = await Task.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(500).json({ msg: "Task cannot be deleted" });
    }

    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);

    // Check if ID is valid
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
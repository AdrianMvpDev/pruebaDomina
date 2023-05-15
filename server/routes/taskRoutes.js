const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);

// Rutas que necesitan autenticación
router.get("/", authMiddleware, taskController.getAllTasks);
router.post("/", authMiddleware, taskController.createTask);
router.get("/:id", authMiddleware, taskController.getTaskById);
router.put("/:id", authMiddleware, taskController.updateTaskById);
router.delete("/:id", authMiddleware, taskController.deleteTaskById);

module.exports = router;

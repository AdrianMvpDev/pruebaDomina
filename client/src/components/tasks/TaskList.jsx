import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import {
  getAllTasks,
  createTask,
  updateTaskById,
  deleteTaskById,
} from "../../services/taskService";
import "../../assets/styles/tasks/task.scss";
import { TextField, Button } from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask(title, description);
      setTasks([newTask, ...tasks]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdate = async (id, updatedTask) => {
    try {
      const updated = await updateTaskById(id, updatedTask);
      const newTasks = tasks.map((task) => (task._id === id ? updated : task));
      setTasks(newTasks);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTaskById(id);
      const newTasks = tasks.filter((task) => task._id !== id);
      setTasks(newTasks);
      console.log(newTasks);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getAllTasks();
        setTasks(tasks);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="task-list">
      <h2 className="task-list__title">Task List</h2>
      <div className="task-container">
        <form onSubmit={handleSubmit} className="task-list__form">
          <h2>Añadir Tareas</h2>
          <TextField
            id="title"
            label="Titulo"
            variant="outlined"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="task-list__input task-list__input--title"
            type="text"
          />
          <TextField
            id="description"
            label="Descripción"
            variant="outlined"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="task-list__input task-list__input--description"
            type="text"
          />
          <Button
            type="submit"
            variant="contained"
            className="task-list__button"
          >
            Añadir
          </Button>
        </form>
        <table className="task-list__tasks">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))}
        </table>
      </div>
    </div>
  );
};

export default TaskList;

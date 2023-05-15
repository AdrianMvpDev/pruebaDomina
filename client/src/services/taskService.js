import axios from "axios";

const API_URL = "http://localhost:4000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      Authorization: `${token}`,
    };
  }
  return { "Content-Type": "application/json" };
};

// Obtener todas las tareas
export const getAllTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`, { headers: getAuthHeader() });
  return res.data;
};

// Crear una nueva tarea
export const createTask = async (title, description) => {
  const res = await axios.post(
    `${API_URL}/tasks`,
    { title, description },
    { headers: getAuthHeader() }
  );
  return res.data;
};

// Obtener una tarea por ID
export const getTaskById = async (id) => {
  const res = await axios.get(`${API_URL}/tasks/${id}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Actualizar una tarea por ID
export const updateTaskById = async (id, updatedTask) => {
    const { title, description } = updatedTask;
    const res = await axios.put(
      `${API_URL}/tasks/${id}`,
      { title, description },
      { headers: getAuthHeader() }
    );
    return res.data;
  };
  
  

// Eliminar una tarea por ID
export const deleteTaskById = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: getAuthHeader(),
      });
      return res.data;
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.msg);
      } else {
        throw err;
      }
    }
  };
  

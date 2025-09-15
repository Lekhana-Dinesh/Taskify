import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api" });
API.defaults.withCredentials = true; // allow cookies

export const getTasks = async (category) => {
  const { data } = await API.get(`/tasks${category ? "?category=" + category : ""}`);
  return data;
};

export const createTask = async (task) => {
  const { data } = await API.post("/tasks", task);
  return data;
};

export const updateTask = async (id, updates) => {
  const { data } = await API.patch(`/tasks/${id}`, updates);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await API.delete(`/tasks/${id}`);
  return data;
};

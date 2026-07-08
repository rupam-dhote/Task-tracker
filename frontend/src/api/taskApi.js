import api from "./axios";

// creating task
export const createTask = async (data) => {
  const res = await api.post("/task/create-task", data);
  return res.data;
};

// updating task
export const updateTask = async ({ id, data }) => {
  const res = await api.put(`/task/update-task/${id}`, data);
  return res.data;
};

// delete task
export const deleteTask = async (id) => {
  const res = await api.delete(`/task/delete-task/${id}`);
  return res.data;
};

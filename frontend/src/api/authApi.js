import api from "./axios";

export const signup = async (data) => {
  const res = await api.post("/user/register", data);
  return res?.data;
};

export const login = async (data) => {
  const res = await api.post("/user/login", data);
  return res?.data;
};

export const getTasks = async () => {
  const res = await api.get("/user/tasks");
  return res?.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/user/me");
  return res.data;
};

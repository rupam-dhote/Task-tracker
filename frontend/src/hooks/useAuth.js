import { useMutation, useQuery } from "@tanstack/react-query";
import { getTasks, login, signup } from "../api/authApi.js";
import { removeToken, setToken } from "../utils/token.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// query for signup
export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signup,

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login", { replace: true });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Signup failed");
    },
  });
};

//   query for login
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);

      toast.success(data.message);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useTasks = () =>
  useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

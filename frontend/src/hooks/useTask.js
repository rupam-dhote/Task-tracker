import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, updateTask } from "../api/taskApi";
import toast from "react-hot-toast";

// create task query
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);
    },
  });
};

// update task query
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};

// delete task query
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};

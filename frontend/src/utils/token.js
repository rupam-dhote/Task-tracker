import toast from "react-hot-toast";

const Token_Key = import.meta.env.VITE_TOKEN_KEY;

// setting token for user authentication
export const setToken = (token) => {
  localStorage.setItem(Token_Key, token);
};

// get token for user
export const getToken = () => {
  return localStorage.getItem(Token_Key);
};

// remove token
export const removeToken = () => {
  localStorage.removeItem(Token_Key);
  toast.success("User Logout Successfully !");
};

import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { useState } from "react";
import { useAuthContext } from "./context/AuthContext.jsx";
import Loading from "./componenet/layout/Loading.jsx";

function App() {
  const { authUser, loading } = useAuthContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? <Dashboard /> : <Navigate to={"/login"} replace />}
      />
      <Route
        path="/login"
        element={!authUser ? <Login /> : <Navigate to={"/"} replace />}
      />
      <Route
        path="/signup"
        element={!authUser ? <Signup /> : <Navigate to={"/"} replace />}
      />
    </Routes>
  );
}

export default App;

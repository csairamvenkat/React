import React, { useContext } from "react";
import UserManagement from "./pages/UserManagement";
import AdminRoute from "./routes/AdminRoute";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  AuthContext
} from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {

  const { isLoggedIn } =
    useContext(AuthContext);

  return (
    <Routes>

      <Route
        path="/login"
        element={
          isLoggedIn
            ? <Navigate to="/dashboard" />
            : <Login />
        }
      />

      <Route
        path="/dashboard"
        element={
          isLoggedIn
            ? <Dashboard />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="*"
        element={
          <Navigate to="/login" />
        }
      />
      <Route
        path="/users"
        element={
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        }
      />

    </Routes>
  );
}

export default App;
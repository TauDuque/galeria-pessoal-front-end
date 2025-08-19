import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../store";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Gallery from "../pages/Gallery";
import Profile from "../pages/Profile";
import Upload from "../pages/Upload";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />

        {/* Rotas de autenticação - redireciona se já logado */}
        <Route
          path="login"
          element={
            isAuthenticated ? <Navigate to="/profile" replace /> : <Login />
          }
        />
        <Route
          path="register"
          element={
            isAuthenticated ? <Navigate to="/profile" replace /> : <Register />
          }
        />

        {/* Rotas protegidas */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Rota 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

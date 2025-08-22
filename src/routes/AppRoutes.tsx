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
import Favorites from "../pages/Favorites"; // Nova página
import Profile from "../pages/Profile";
import ArtworkDetails from "../pages/ArtworkDetails";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="artwork/:id" element={<ArtworkDetails />} />

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
          path="favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
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

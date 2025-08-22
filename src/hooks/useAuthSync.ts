import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { loginUser, getCurrentUser } from "../store/slices/authSlice";

export const useAuthSync = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isAuthenticated) {
      console.log("🔍 useAuthSync - Token encontrado, sincronizando estado...");

      // Tentar buscar o usuário atual com o token
      dispatch(getCurrentUser())
        .unwrap()
        .then((userData) => {
          console.log("✅ useAuthSync - Usuário sincronizado:", userData);
        })
        .catch((error) => {
          console.error("❌ useAuthSync - Erro ao sincronizar usuário:", error);
          // Se falhar, remover token inválido
          localStorage.removeItem("token");
        });
    }
  }, [dispatch, isAuthenticated]);

  return { isAuthenticated, user };
};

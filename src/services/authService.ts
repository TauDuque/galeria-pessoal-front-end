import api from "./api";
import { LoginCredentials, RegisterData, User, ApiResponse } from "../types";

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/api/users/login",
      credentials
    );
    return response.data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/api/users/register",
      userData
    );
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/api/users/profile");
    return response.data;
  },

  async logout(): Promise<void> {
    // Limpar token do localStorage é feito no slice
    localStorage.removeItem("token");
  },
};

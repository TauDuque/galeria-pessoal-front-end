import api from "./api";
import { LoginCredentials, RegisterData, User, ApiResponse } from "../types";

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/api/users/login",
      credentials
    );
    return response.data.data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/api/users/register",
      userData
    );
    return response.data.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<User>>("/api/users/profile");
    return response.data.data;
  },

  async logout(): Promise<void> {
    // Limpar token do localStorage é feito no slice
    localStorage.removeItem("token");
  },
};

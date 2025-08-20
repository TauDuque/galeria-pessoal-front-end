import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User, LoginCredentials, RegisterData } from "../../types";
import { authService } from "../../services/authService";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

      // Verificar se a resposta tem a estrutura esperada
      if (response && response.token && response.user) {
        localStorage.setItem("token", response.token);
        return response;
      } else {
        return rejectWithValue("Resposta inválida da API");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Erro no login");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      // Verificar se a resposta tem a estrutura esperada
      if (response && response.token && response.user) {
        localStorage.setItem("token", response.token);
        return response;
      } else {
        return rejectWithValue("Resposta inválida da API");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Erro no registro");
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("🔍 Login Fulfilled Payload:", action.payload); // Debug log

        // Verificar se payload existe e tem a estrutura correta
        if (action.payload && action.payload.user && action.payload.token) {
          console.log("✅ Atualizando estado com:", action.payload); // Debug log
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.error = null;
        } else {
          console.error("❌ Payload inválido:", action.payload); // Debug log
          state.error = "Resposta inválida da API";
          state.isAuthenticated = false;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Verificar se payload existe e tem a estrutura correta
        if (action.payload && action.payload.user && action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.error = null;
        } else {
          state.error = "Resposta inválida da API";
          state.isAuthenticated = false;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get Current User
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

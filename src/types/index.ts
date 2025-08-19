// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Artwork Types
export interface Artwork {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  userId: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface ArtworkState {
  artworks: Artwork[];
  currentArtwork: Artwork | null;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

// API Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
}

// Upload Types
export interface UploadArtworkData {
  title: string;
  description?: string;
  image: File;
}

// UI Types
export interface UIState {
  theme: "light" | "dark";
  sidebarOpen: boolean;
  modalOpen: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

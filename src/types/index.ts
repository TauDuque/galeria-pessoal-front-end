// User Types
export interface User {
  id: string | number; // Aceitar tanto string quanto number
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

// Artwork Types (Met Museum)
export interface Artwork extends MetMuseumArtwork {
  // Mantém compatibilidade com MetMuseumArtwork
  // Adiciona campos específicos se necessário
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

// Met Museum Types
export interface MetMuseumArtwork {
  id: string | number;
  title: string;
  artist?: string;
  date?: string;
  medium?: string;
  dimensions?: string;
  culture?: string;
  period?: string;
  department?: string;
  imageUrl?: string;
  objectURL?: string;
  isPublicDomain?: boolean;
}

// Favorite Types
export interface FavoriteArtwork {
  id: string;
  artworkId: string | number;
  userId: string | number;
  artwork: MetMuseumArtwork;
  createdAt: string;
}

// Search Types
export interface SearchFilters {
  query?: string;
  department?: string;
  period?: string;
  culture?: string;
  medium?: string;
  isPublicDomain?: boolean;
  hasImage?: boolean;
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

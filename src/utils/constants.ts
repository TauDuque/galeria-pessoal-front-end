export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001";

export const APP_CONFIG = {
  name: process.env.REACT_APP_NAME || "ArtGallery",
  version: process.env.REACT_APP_VERSION || "1.0.0",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  GALLERY: "/gallery",
  PROFILE: "/profile",
  UPLOAD: "/upload",
} as const;

export const NOTIFICATION_DURATION = 3000;

export const FILE_UPLOAD = {
  MAX_SIZE: parseInt(process.env.REACT_APP_MAX_FILE_SIZE || "5242880"), // 5MB
  ACCEPTED_TYPES: (
    process.env.REACT_APP_ALLOWED_FILE_TYPES ||
    "image/jpeg,image/png,image/webp"
  ).split(","),
  ACCEPTED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".webp"],
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 50,
} as const;

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_NAME_LENGTH: 2,
  MIN_TITLE_LENGTH: 3,
  MAX_DESCRIPTION_LENGTH: 500,
} as const;

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://sua-url-railway.up.railway.app";

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
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: ["image/jpeg", "image/png", "image/webp"],
} as const;

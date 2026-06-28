export const ROUTES = {
  // Public
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Protected
  DASHBOARD: "/dashboard",
  PREDICT: "/predict",
  MODELS: "/models",
  INDICATORS: "/indicators",
  REPORTS: "/reports",
  SETTINGS: "/settings",
  HELP: "/help",

  // Admin
  ADMIN: "/admin",
  ADMIN_SYNC: "/admin/sync",
  ADMIN_ARTIFACTS: "/admin/artifacts",
  ADMIN_USERS: "/admin/users",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export type UserRole = "trader" | "analyst" | "student" | "developer" | "admin";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  selectedAsset: string;
  showBollinger: boolean;
  showRsi: boolean;
  showMacd: boolean;
  showSma: boolean;
  showEma: boolean;
  theme: "dark" | "light";
}

export const ROLE_LABELS: Record<UserRole, string> = {
  trader: "Trader",
  analyst: "Analyst",
  student: "Student",
  developer: "Developer",
  admin: "Admin",
};

export const ROLE_COLORS: Record<UserRole, string> = {
  trader: "#3B82F6",
  analyst: "#8B5CF6",
  student: "#22C55E",
  developer: "#06B6D4",
  admin: "#F7931A",
};

import type { UserRole } from "../@types/auth";

export const getRedirectPathByRole = (role: UserRole | null): string =>
  role === "ROLE_MENTOR" ? "/mentor/dashboard" : "/";

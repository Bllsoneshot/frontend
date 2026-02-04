import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { getRedirectPathByRole } from "../../utils/routeUtils";
import type { UserRole } from "../../@types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuthStore();

  // 비로그인 유저는 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // allowedRoles가 지정되어 있고, 현재 유저의 role이 포함되지 않으면 리다이렉트
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to={getRedirectPathByRole(role)} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

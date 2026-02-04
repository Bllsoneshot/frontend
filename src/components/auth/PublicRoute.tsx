import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { getRedirectPathByRole } from "../../utils/routeUtils";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, role } = useAuthStore();

  // 로그인 상태면 role에 따라 리다이렉트
  if (isAuthenticated) {
    return <Navigate to={getRedirectPathByRole(role)} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;

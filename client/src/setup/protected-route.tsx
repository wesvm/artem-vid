import { Navigate, Outlet, useLocation } from "react-router";
import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "@/setup/auth-context";

interface ProtectedRouteProps extends PropsWithChildren {
  requiredRoles?: string[];
}

export const ProtectedRoute = ({
  children,
  requiredRoles,
}: ProtectedRouteProps) => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      logout();
    }
  }, [location.pathname, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user && requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

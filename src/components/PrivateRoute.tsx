import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const PrivateRoute = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  );
};

export default PrivateRoute;

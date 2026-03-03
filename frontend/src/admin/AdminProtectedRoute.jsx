import { Navigate, Outlet, useLocation } from "react-router-dom";
import { adminStorage } from "../lib/adminStorage";

const AdminProtectedRoute = () => {
  const location = useLocation();

  if (!adminStorage.hasToken()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;

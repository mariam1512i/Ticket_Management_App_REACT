// ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  return role ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

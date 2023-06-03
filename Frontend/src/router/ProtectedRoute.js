import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading === false && !isAuthenticated) {
    return <Navigate to="/authentication" replace />;
  }
  return children;
};

export default ProtectedRoute;

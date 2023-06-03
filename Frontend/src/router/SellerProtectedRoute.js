import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  if (isLoading === true) {
    return <Loader />;
  }

  if (isLoading === false && !isSeller) {
    return <Navigate to={`/shop-create`} replace />;
  }

  return children;
};

export default SellerProtectedRoute;

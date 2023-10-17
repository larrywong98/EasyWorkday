import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { status } from "../../reducer/global";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer);
  const location = useLocation();
  if (user.role === "emp") {
    if (location.pathname.includes("onboard")) {
      if (user.applicationStatus === status.approved) {
        return <Navigate to="/" />;
      } else {
        return <>{children}</>;
      }
    }
    if (location.pathname.includes("visa")) {
      if (user.applicationStatus === status.approved) {
        return <>{children}</>;
      } else {
        return <Navigate to="/emp/onboard" />;
      }
    }
    if (location.pathname.includes("profile")) {
      if (
        user.applicationStatus === status.approved &&
        user.visaStatus === status.approved
      ) {
        return <>{children}</>;
      } else if (
        user.applicationStatus === status.approved &&
        user.visaStatus !== status.approved
      ) {
        return <Navigate to="/emp/visa" />;
      } else if (user.applicationStatus !== status.approved) {
        return <Navigate to="/emp/onboard" />;
      }
    }
  } else if (user.role === "hr") {
  } else {
    return <Navigate to="error" />;
  }
};
export default ProtectedRoute;

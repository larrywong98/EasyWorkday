import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { status } from "../../reducer/global";
import { isExpired } from "react-jwt";
// import checkExp from "../../services/checkExp";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer);
  const userInfo = useSelector((state) => state.authReducer);
  const location = useLocation();
  if (location.pathname.includes("register")) {
    const token = location.pathname.split("/").splice(-1)[0];
    if (isExpired(token)) {
      return <>Expired</>;
    } else {
      return <>{children}</>;
    }
  }
  if (userInfo.signedIn === false) {
    return <Navigate to="/signin" />;
  }
  if (userInfo.signedIn && location.pathname.includes("signin")) {
    return <Navigate to="/" />;
  }
  if (userInfo.role === "emp") {
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
    return <Navigate to="/error" />;
  }
};
export default ProtectedRoute;

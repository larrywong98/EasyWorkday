import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { status } from "../../reducer/global";
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer);
  const userInfo = useSelector((state) => state.authReducer);
  const location = useLocation();

  // register token expiration
  if (location.pathname.includes("register")) {
    const token = location.pathname.split("/").splice(-1)[0];
    if (!token.includes(".")) {
      return <Navigate to="/error" />;
    }
    var decoded = jwt_decode(token);
    if (decoded.exp * 1000 < Date.now()) {
      return (
        <Navigate
          to="/error"
          state={{ message: "Registration Link Expired !!!" }}
        />
      );
    } else {
      return <>{children}</>;
    }
  }
  // not signed in
  if (userInfo.signedIn === false) {
    return <Navigate to="/signin" />;
  }

  // already signed in
  if (userInfo.signedIn && location.pathname.includes("signin")) {
    return <Navigate to="/" />;
  }
  // user is employee
  if (userInfo.role === "emp") {
    // no access to hr page
    if (location.pathname.includes("hr")) {
      return <Navigate to="/error" />;
    }
    //  onboard status
    if (location.pathname.includes("onboard")) {
      if (user.applicationStatus === status.approved) {
        return <Navigate to="/" />;
      } else {
        return <>{children}</>;
      }
    }
    // visa status
    if (location.pathname.includes("visa")) {
      if (user.applicationStatus !== "approved") {
        return <Navigate to="/emp/onboard" />;
      }
      return <>{children}</>;
    }
    // profile status
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
      } else {
        return <Navigate to="/emp/onboard" />;
      }
    }
  } else if (userInfo.role === "hr") {
    if (
      location.pathname === "/emp/onboard" ||
      location.pathname === "/emp/visa" ||
      location.pathname === "/emp/profile"
    ) {
      return <Navigate to="/home" />;
    }

    return <>{children}</>;
  } else {
    return <Navigate to="/error" />;
  }
};
export default ProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { status } from "../../reducer/global";
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer);
  const userInfo = useSelector((state) => state.authReducer);
  const location = useLocation();

  // register token expiration
  if (location.pathname.includes("register")) {
    const token = location.pathname.split("/").splice(-1)[0];
    var decoded = jwt_decode(token);
    // if (decoded.exp * 1000 < Date.now()) {
    //   return (
    //     <Navigate
    //       to="/error"
    //       state={{ message: "Registration Link Expired !!!" }}
    //     />
    //   );
    // } else
    // {
    return <>{children}</>;
    // }
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
      if (user.info.visaTitle === "F1(CPT/OPT)") {
        return <>{children}</>;
      } else {
        return <Navigate to="/emp/onboard" />;
      }
    }
    // profile status
    if (location.pathname.includes("profile")) {
      if (user.applicationStatus === status.approved) {
        return <>{children}</>;
      } else {
        return <Navigate to="/emp/onboard" />;
      }
    }
  } else if (userInfo.role === "hr") {
    console.log(userInfo.role);
    console.log(location.pathname === "/emp/visa");
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

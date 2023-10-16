import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { status } from "../../reducer/global";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer);
  const location = useLocation();
  if (user.role === "emp") {
    if (location.pathname.includes("onboard")) {
      if (user.applicationStatus === status.approved) {
        return <Navigate to="/home" />;
      } else {
        return <>{children}</>;
      }
    }
    // if (location.pathname.includes("visa")) {
    //   if (user.data.visaTitle === "F1(CPT/OPT)") {
    //     return <Navigate to="/emp/onboard" />;
    //   } else {
    //     return <>{children}</>;
    //   }
    // }
  } else if (user.role === "hr") {
  } else {
    return <Navigate to="error" />;
  }
};
export default ProtectedRoute;

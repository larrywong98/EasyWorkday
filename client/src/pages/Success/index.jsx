import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.css";
import { AnimatePresence, motion } from "framer-motion";

// check icon animation
const AnimatedCheckIcon = ({ initial = true, isVisible }) => {
  return (
    <AnimatePresence initial={initial}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3"
        stroke="currentColor"
        className={styles["check-icon"]}
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          exit={{ pathLength: 0 }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: isVisible ? "easeOut" : "easeIn",
          }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    </AnimatePresence>
  );
};

// Success with message
const Success = () => {
  const location = useLocation();
  const { message } = location?.state || { message: "Success" };
  return (
    <div className={styles["status-page"]}>
      <div className={styles["status-content"]}>
        <AnimatedCheckIcon />
        <p>{message}</p>

        <Link className={styles["go-home-btn"]} to="/">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Success;

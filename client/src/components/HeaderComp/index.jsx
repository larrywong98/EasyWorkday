import React, { useEffect, useState } from "react";
import { Button, Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import styles from "./index.module.css";
import { signOut } from "../../reducer/authSlice";
const { Header } = Layout;

const HeaderComp = () => {
  const [current, setCurrent] = useState("");
  const userInfo = useSelector((state) => state.authReducer);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = (e) => {
    if (e.key === "0") navigate(`/${userInfo.role}/onboard`);
    if (e.key === "1") navigate(`/${userInfo.role}/visa`);
    if (e.key === "2") navigate(`/${userInfo.role}/profile`);
    setCurrent(e.key);
  };
  const headerText = {
    emp: ["Onboarding Application", "Visa Management", "Personal Information"],
    hr: ["Hiring Management", "Visa Management", "Employee Profiles"],
  };
  useEffect(() => {
    if (location.pathname.includes("onboard")) {
      setCurrent("0");
    } else if (location.pathname.includes("visa")) {
      setCurrent("1");
    } else if (location.pathname.includes("profile")) {
      setCurrent("2");
    } else {
      setCurrent("");
    }
  }, [location]);

  return (
    <Header className={styles["header"]}>
      <Link className={styles["header-title"]} to="/">
        EasyWorkday
      </Link>

      {userInfo.signedIn ? (
        <>
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={(e) => onClick(e)}
            // defaultSelectedKeys={[current]}
            selectedKeys={[current]}
            items={headerText[userInfo.role].map((pageName, index) => {
              const key = index;
              return {
                key,
                label: pageName,
              };
            })}
            className={styles["header-menu"]}
          />
          <Button
            type="text"
            className={styles["header-signin"]}
            onClick={() => {
              dispatch(signOut());
              localStorage.clear();
              navigate("success", {
                state: { message: "Logout Successful!!!" },
              });
            }}
          >
            <AiOutlineUser
              style={{ width: "30px", height: "30px", color: "yellow" }}
            />
          </Button>
        </>
      ) : (
        <Button
          type="text"
          className={styles["header-signin"]}
          onClick={() => navigate("/signin")}
        >
          <AiOutlineUser style={{ width: "30px", height: "30px" }} />
        </Button>
      )}
    </Header>
  );
};

export default HeaderComp;

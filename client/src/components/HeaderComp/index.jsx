import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { Typography } from "antd";
import styles from "./index.module.css";
import { signOut } from "../../reducer/authSlice";
const { Text } = Typography;
const { Header } = Layout;

const HeaderComp = () => {
  const [current, setCurrent] = useState("");
  // const user = useSelector((state) => state.userReducer);
  const userInfo = useSelector((state) => state.authReducer);
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

  return (
    <Header className={styles["header"]}>
      <Link className={styles["header-title"]} to="/">
        EasyWorkday
      </Link>
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

      {userInfo.signedIn ? (
        <Button
          type="text"
          className={styles["header-signin"]}
          onClick={() => {
            dispatch(signOut());
            localStorage.clear();
            navigate("success", { state: { message: "Logout Successful!!!" } });
          }}
        >
          <AiOutlineUser
            style={{ width: "30px", height: "30px", color: "yellow" }}
          />
        </Button>
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

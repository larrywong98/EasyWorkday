import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { Typography } from "antd";
import styles from "./index.module.css";
const { Title, Text } = Typography;
const { Header } = Layout;

const HeaderComp = () => {
  const [current, setCurrent] = useState("");
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const onClick = (e) => {
    if (e.key === "0") navigate(`/${user.role}/onboard`);
    if (e.key === "1") navigate(`/${user.role}/visa`);
    if (e.key === "2") navigate(`/${user.role}/profile`);
    setCurrent(e.key);
  };
  const headerText = {
    emp: ["Onboarding Application", "Visa Management", "Personal Information"],
    hr: ["Hiring Management", "Visa Management", "Employee Profiles"],
  };
  return (
    <Header className={styles["header"]}>
      <Text level={3} className={styles["header-title"]}>
        EasyWorkday
      </Text>
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={(e) => onClick(e)}
        // defaultSelectedKeys={[current]}
        selectedKeys={[current]}
        items={headerText[user.role].map((pageName, index) => {
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
        onClick={() => navigate("/signin")}
      >
        <AiOutlineUser style={{ width: "30px", height: "30px" }} />
      </Button>
    </Header>
  );
};

export default HeaderComp;

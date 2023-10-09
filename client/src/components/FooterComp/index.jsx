import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const FooterComp = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#001529",
        color: "#ffffff",
      }}
    >
      Ant Design ©2023 Created by Ant UED
    </Footer>
  );
};

export default FooterComp;

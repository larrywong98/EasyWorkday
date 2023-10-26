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
      EasyWorkday ©2023 Created by EasyWorkday Group
    </Footer>
  );
};

export default FooterComp;

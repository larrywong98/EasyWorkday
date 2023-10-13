import OnBoardingEmp from "./OnBoardingEmp";

import React from "react";
import { Layout } from "antd";
import HeaderComp from "../components/HeaderComp";
import FooterComp from "../components/FooterComp";
import { Route, Routes } from "react-router";
import VisaEmp from "./VisaEmp";
import ProfileEmp from "./ProfileEmp";
import OnBoardingHr from "./OnBoardingHr";
import VisaHr from "./VisaHr";
import ProfileHr from "./ProfileHr";
import { Content } from "antd/es/layout/layout";
import Authform from "../components/Authform";
import Success from "./Success";
import Home from "./Home";
import ProtectedRoute from "../components/ProtectedRoute";

const App = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <HeaderComp />
      <Content
        style={{
          padding: "50px 50px",
          backgroundColor: "#dddddd",
        }}
      >
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="signin" element={<Authform />} />
            <Route path="emp">
              <Route
                path="onboard"
                element={
                  <ProtectedRoute>
                    <OnBoardingEmp />
                  </ProtectedRoute>
                }
              />
              <Route
                path="visa"
                element={
                  <ProtectedRoute>
                    <VisaEmp />
                  </ProtectedRoute>
                }
              />
              <Route path="profile" element={<ProfileEmp />}>
                <Route path=":empId" element={<ProfileEmp />} />
              </Route>
            </Route>
            <Route path="hr">
              <Route path="onboard" element={<OnBoardingHr />} />
              <Route path="visa" element={<VisaHr />} />
              <Route path="profile" element={<ProfileHr />} />
            </Route>
            <Route path="success" element={<Success />} />
          </Route>
        </Routes>
      </Content>
      <FooterComp />
    </Layout>
  );
};

export default App;

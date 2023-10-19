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
import Success from "./Success";
import Home from "./Home";
import ProtectedRoute from "../components/ProtectedRoute";
import Register from "./Register";
import SignIn from "./SignIn";
import HrDecision from "./HrDecision";

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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="register/:regToken" element={<Register />} />
            <Route path="signin" element={<SignIn />} />
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
              <Route
                path="decision/:employeeId"
                element={<HrDecision />}
              ></Route>
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

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
import InProgress from "./VisaHr/InProgress";
import OnBoardingEmpById from "./OnBoardEmpById";
import InProgress from "./VisaHr/InProgress";

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
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfileEmp />
                  </ProtectedRoute>
                }
              >
                <Route path=":empId" element={<ProfileEmp />} />
              </Route>
              <Route path="profileById" element={<OnBoardingEmpById />}></Route>
            </Route>
            <Route path="hr">
              <Route path="onboard" element={<OnBoardingHr />} />
              <Route path="visa" element={<VisaHr />} />
              <Route path="visa/inProgress" element={<InProgress />} />
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

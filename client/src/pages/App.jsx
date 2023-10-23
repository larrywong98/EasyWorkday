import OnBoardingEmp from "./OnBoardingEmp";

import React from "react";
import { Layout } from "antd";
import HeaderComp from "../components/HeaderComp";
import FooterComp from "../components/FooterComp";
import { Route, Routes } from "react-router";
import VisaEmp from "./VisaEmp";
import ProfileEmp from "./ProfileEmp";
import OnBoardingHr from "./OnBoardingHr";
// import VisaHr from "./VisaHr";
import ProfileHr from "./ProfileHr";
import { Content } from "antd/es/layout/layout";
import Success from "./Success";
import Home from "./Home";
import ProtectedRoute from "../components/ProtectedRoute";
import Register from "./Register";
import SignIn from "./SignIn";
import InProgress from "./VisaHr/InProgress";
import HrDecision from "./HrDecision";
import ProfileHrView from "./ProfileHrView";
import Error from "./Error";

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
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route
              path="register/:regToken"
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />
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
                  // <ProtectedRoute>
                  <VisaEmp />
                  // </ProtectedRoute>
                }
              />
              <Route path="profile">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <ProfileEmp />
                    </ProtectedRoute>
                  }
                />
                <Route path="view" element={<ProfileHrView />} />
              </Route>
            </Route>
            <Route path="hr">
              <Route
                path="onboard"
                element={
                  <ProtectedRoute>
                    <OnBoardingHr />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="visa" element={<VisaHr />} /> */}
              <Route
                path="visa/inprogress"
                element={
                  <ProtectedRoute>
                    <InProgress />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfileHr />
                  </ProtectedRoute>
                }
              />
              <Route
                path="decision/:employeeId"
                element={
                  <ProtectedRoute>
                    <HrDecision />
                  </ProtectedRoute>
                }
              ></Route>
            </Route>
            <Route path="success" element={<Success />} />
            <Route path="error" element={<Error />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Content>
      <FooterComp />
    </Layout>
  );
};

export default App;

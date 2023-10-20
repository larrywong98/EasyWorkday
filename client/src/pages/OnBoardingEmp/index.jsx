import { Space, Card, Row, Col } from "antd";
import { Button, Form, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import NameSection from "../../components/NameSection";
import AddressSection from "../../components/AddressSection";
import ContactSection from "../../components/ContactSection";
import CitizenSection from "../../components/CitizenSection";
import ReferenceSection from "../../components/ReferenceSection";
import FileSection from "../../components/FileSection";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { status } from "../../reducer/global";
import {
  fillInfo,
  updateUserId,
  updateVisaOptReceipt,
} from "../../reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Feedback from "../../components/Feedback";
import saveInfo from "../../services/saveInfo";

const OnBoardingEmp = () => {
  const [form] = Form.useForm();

  const user = useSelector((state) => state.userReducer);
  const userInfo = useSelector((state) => state.authReducer);
  const [disabled, setDisabled] = useState(
    user.applicationStatus === status.initial ? false : true
  );
  const initialData = useMemo(() => {
    let tmp = { ...user.info };
    if (user.info.dob !== "") tmp.dob = dayjs(user.info.dob, "YYYY/MM/DD");
    if (user.info.visaDate[0] !== "" || user.info.visaDate[1] !== "") {
      tmp.visaDate = [
        dayjs(user.info.visaDate[0], "YYYY/MM/DD"),
        dayjs(user.info.visaDate[1], "YYYY/MM/DD"),
      ];
    }
    return tmp;
  }, [user.info]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sectionClosed, setsectionClosed] = useState(Array(6).fill(false));
  const { Title } = Typography;

  const onSubmit = async (data) => {
    data.profilePicture = "http://";
    data.dob = data.dob.format("YYYY/MM/DD");

    if (data.visaDate === undefined) {
      data.visaDate = ["", ""];
    } else {
      data.visaDate = [
        data.visaDate[0].format("YYYY/MM/DD"),
        data.visaDate[1].format("YYYY/MM/DD"),
      ];
    }

    // console.log(data);
    // change to pending
    // const newData = { applicationStatus: status.pending, info: data };
    const newData = {
      role: user.role,
      applicationStatus: status.pending,
      onboardFeedback: user.onboardFeedback,
      info: data,
      visa: user.visa,
      files: user.files,
      createDate: user.createDate,
      lastUpdateDate: user.lastUpdateDate,
      deleteDate: user.deleteDate,
    };
    dispatch(fillInfo(newData));
    dispatch(updateVisaOptReceipt({ status: "pending" }));
    // console.log(user);
    // mongodb save
    // generateUserId();

    const response = await saveInfo(user, newData);
    dispatch(updateUserId({ userId: response.userId }));

    console.log(response);
    // console.log(
    //   await sendRequest({
    //     url: "http://127.0.0.1:4000/api/emp/md5",
    //     method: "GET",
    //   })
    // );
    navigate("/success", { state: { message: "Submit Successful" } });
  };
  const sectionControl = (i) => {
    let newsectionClosed = [...sectionClosed];
    newsectionClosed[i] = !newsectionClosed[i];
    setsectionClosed(newsectionClosed);
  };
  // const checkStatus = () => {
  //   if (user.applicationStatus === status.rejected) {
  //     return true;
  //   }
  //   if (user.applicationStatus === status.pending) {
  //     return true;
  //   }
  //   return false;
  // }; setDisabled(checkStatus());

  return (
    <>
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          minWidth: 800,
        }}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          style={{
            width: "100%",
            minWidth: 1000,
            maxWidth: 1600,
          }}
          layout="horizontal"
          initialValues={initialData}
          form={form}
          onFinish={onSubmit}
          disabled={disabled}
        >
          <Title
            level={2}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "50px",
            }}
          >
            Onboarding Application
          </Title>
          <Row
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <NameSection
              sectionClosed={sectionClosed}
              sectionControl={sectionControl}
            />
            <AddressSection
              sectionClosed={sectionClosed}
              sectionControl={sectionControl}
            />
            <ContactSection
              sectionClosed={sectionClosed}
              sectionControl={sectionControl}
            />
            <CitizenSection
              sectionClosed={sectionClosed}
              sectionControl={sectionControl}
            />
            <ReferenceSection
              sectionClosed={sectionClosed}
              sectionControl={sectionControl}
            />
            <FileSection
              sectionClosed={sectionClosed}
              sectionControl={sectionControl}
            />
            <Col span={16}>
              <Space style={{ width: "100%" }} align="end" direction="vertical">
                <Space size="middle">
                  {user.applicationStatus === status.pending ? (
                    <Typography style={{ color: "#ff9800" }}>
                      Please wait for HR to review your application
                    </Typography>
                  ) : (
                    <></>
                  )}
                  <Button type="primary" htmlType="submit">
                    submit
                  </Button>
                </Space>
              </Space>
            </Col>
            <Col span={16}>
              <Feedback feedback="onboard" />
            </Col>
          </Row>
        </Form>
        <Space style={{ width: "100%" }} align="center" direction="vertical">
          {user.applicationStatus === status.rejected ? (
            <Button
              type="primary"
              style={{ width: "100%" }}
              onClick={() => setDisabled(false)}
              disabled={!disabled}
            >
              Edit
            </Button>
          ) : (
            <></>
          )}
        </Space>
      </Card>
    </>
  );
};

export default OnBoardingEmp;

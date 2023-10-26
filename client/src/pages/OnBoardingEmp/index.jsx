import { Space, Row, Col } from "antd";
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
  loadUser,
  updateUserId,
  updateVisaOptReceipt,
} from "../../reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Feedback from "../../components/Feedback";
import saveInfo from "../../services/saveInfo";
import { loadUserInfo } from "../../services/loadUserInfo";

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
    console.log(data);
    data.profilePicture = "http://";
    data.dob = data.dob.format("YYYY/MM/DD");
    if (data.visaDate === undefined) {
      data.visaDate = ["", ""];
    } else {
      if (data.visaDate[0] !== "" && data.visaDate[1] !== "") {
        data.visaDate = [
          data.visaDate[0].format("YYYY/MM/DD"),
          data.visaDate[1].format("YYYY/MM/DD"),
        ];
      }
    }
    let newVisa = {
      ...user.visa,
    };
    if (user.info.visaTitle === "F1(CPT/OPT)") {
      newVisa.optStatus = "pending";
    }
    // change to pending
    // const newData = { applicationStatus: status.pending, info: data };
    const newData = {
      role: user.role,
      applicationStatus: status.pending,
      onboardFeedback: user.onboardFeedback,
      info: data,
      visa: newVisa,
      files: user.files,
      createDate: user.createDate,
      lastUpdateDate: user.lastUpdateDate,
      deleteDate: user.deleteDate,
    };
    dispatch(fillInfo(newData));
    dispatch(updateVisaOptReceipt({ status: "pending" }));

    // save user
    const response = await saveInfo(user, newData);
    dispatch(updateUserId({ userId: response.userId }));
    setDisabled(true);
    // navigate("/success", { state: { message: "Submit Successful" } });
  };
  const sectionControl = (i) => {
    let newsectionClosed = [...sectionClosed];
    newsectionClosed[i] = !newsectionClosed[i];
    setsectionClosed(newsectionClosed);
  };
  const itemLayout = {
    labelCol: {
      sm: { span: 24 },
      md: { span: 8 },
    },
    wrapperCol: { sm: { span: 24 }, md: { span: 14 } },
  };
  const formLayout = {
    layout: { sm: "vertical", md: "horizontal" },
  };

  useEffect(() => {
    (async () => {
      const response1 = await loadUserInfo(userInfo.userId);
      dispatch(loadUser({ user: response1 }));
    })();
  }, []);

  return (
    <>
      <Form
        {...itemLayout}
        style={{
          width: "100%",
          minWidth: 580,
          maxWidth: 1600,
        }}
        {...formLayout}
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
            <Space
              size="middle"
              style={{
                width: "98%",
                marginLeft: "1%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography style={{ color: "#ff9800" }}>
                {user.applicationStatus === status.pending
                  ? "Please wait for HR to review your application"
                  : ""}
              </Typography>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
    </>
  );
};

export default OnBoardingEmp;

import { Space, Card, Row, Col } from "antd";

import { Button, Form, Typography } from "antd";

import { useMemo, useState } from "react";
import NameSection from "../../components/NameSection";
import AddressSection from "../../components/AddressSection";
import ContactSection from "../../components/ContactSection";
import CitizenSection from "../../components/CitizenSection";
import ReferenceSection from "../../components/ReferenceSection";
import FileSection from "../../components/FileSection";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { status } from "../../reducer/global";
import { fillInfo } from "../../reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import Feedback from "../../components/Feedback";

const { TextArea } = Input;

const OnBoardingEmp = () => {
  // const { register, handleSubmit, control } = useForm();
  // const [formData, setFormData] = useState();
  const [form] = Form.useForm();
  // const [gender, setGender] = useState("");
  // const [citizen, setCitizen] = useState("");
  // const [visa, setVisa] = useState("");
  // const [ssnValue, setSsnValue] = useState("");
  // const [emergencyContacts, setEmergencyContacts] = useState(["#1"]);
  const user = useSelector((state) => state.userReducer);
  const initialData = useMemo(() => {
    let tmp = { ...user.data };
    tmp.dob = dayjs(user.data.dob, "YYYY/MM/DD");
    // tmp.startDate = dayjs(user.data.visaDate[0], "YYYY/MM/DD");
    // tmp.endDate = dayjs(user.data.visaDate[1], "YYYY/MM/DD");
    tmp.visaDate = [
      dayjs(user.data.visaDate[0], "YYYY/MM/DD"),
      dayjs(user.data.visaDate[1], "YYYY/MM/DD"),
    ];
    return tmp;
  }, [user.data]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sectionClosed, setsectionClosed] = useState(Array(6).fill(false));
  const { Title } = Typography;

  const onSubmit = (data) => {
    data.profilePic = "http://";

    // applicationStatus = status.pending;
    // data.dob = new Date(data.dob.$d).getTime();
    data.dob = data.dob.format("YYYY/MM/DD");

    data.visaDate = [
      data.visaDate[0].format("YYYY/MM/DD"),
      data.visaDate[1].format("YYYY/MM/DD"),
    ];
    // console.log(typeof data.dob.format("YYYY/MM/DD"));
    // console.log(data);
    // console.log(data);
    dispatch(fillInfo({ applicationStatus: status.pending, data: data }));
    // setFormData(data);
    navigate("/success", { state: { message: "Submit Successful" } });
  };
  const sectionControl = (i) => {
    let newsectionClosed = [...sectionClosed];
    newsectionClosed[i] = !newsectionClosed[i];
    setsectionClosed(newsectionClosed);
  };
  const checkStatus = () => {
    console.log(user.applicationStatus, status.pending);
    return user.applicationStatus === status.pending ? true : false;
  };

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
          disabled={checkStatus()}
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
              <Feedback />
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default OnBoardingEmp;

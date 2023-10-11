import { Space, DatePicker, Card, Row } from "antd";

import { Button, Form, Typography } from "antd";

import { useState } from "react";
import NameSection from "../../components/NameSection";
import AddressSection from "../../components/AddressSection";
import ContactSection from "../../components/ContactSection";
import CitizenSection from "../../components/CitizenSection";
import ReferenceSection from "../../components/ReferenceSection";
import FileSection from "../../components/FileSection";

const OnBoardingEmp = () => {
  // const { register, handleSubmit, control } = useForm();
  const [formData, setFormData] = useState();
  const [form] = Form.useForm();
  const [gender, setGender] = useState("");
  const [citizen, setCitizen] = useState("");
  const [visa, setVisa] = useState("");
  const [ssnValue, setSsnValue] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState(["#1"]);
  const [sectionClosed, setsectionClosed] = useState(Array(6).fill(false));
  const { Title } = Typography;

  const onSubmit = (data) => {
    data.profilePic = "http://";
    console.log(data);
    setFormData(data);
  };
  const sectionControl = (i) => {
    let newsectionClosed = [...sectionClosed];
    newsectionClosed[i] = !newsectionClosed[i];
    setsectionClosed(newsectionClosed);
  };
  const requiredItem = [
    {
      required: true,
    },
  ];
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
            minWidth: 800,
            maxWidth: 1600,
          }}
          layout="horizontal"
          form={form}
          onFinish={onSubmit}
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

            <Space style={{ width: "100%" }} align="end" direction="vertical">
              <Button type="primary" htmlType="submit">
                submit
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default OnBoardingEmp;

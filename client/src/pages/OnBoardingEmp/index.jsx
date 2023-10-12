import { Space, DatePicker, Card, Row, Col } from "antd";

import { Button, Form, Typography } from "antd";

import { useState } from "react";
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
import { useDispatch } from "react-redux";

const OnBoardingEmp = () => {
  // const { register, handleSubmit, control } = useForm();
  const [formData, setFormData] = useState();
  const [form] = Form.useForm();
  const [gender, setGender] = useState("");
  const [citizen, setCitizen] = useState("");
  const [visa, setVisa] = useState("");
  const [ssnValue, setSsnValue] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState(["#1"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sectionClosed, setsectionClosed] = useState(Array(6).fill(false));
  const { Title } = Typography;

  const onSubmit = (data) => {
    data.profilePic = "http://";

    data.applicationStatus = status.pending;
    data.dob = new Date(data.dob.$d).getTime();
    // console.log(new Date(data.dob.$d).getTime());
    // console.log(data);
    dispatch(fillInfo({ data: data }));
    setFormData(data);
    navigate("/success", { state: { message: "Submit Successful" } });
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
            span: 12,
          }}
          style={{
            width: "100%",
            minWidth: 1000,
            maxWidth: 1600,
          }}
          layout="horizontal"
          initialValues={{
            // section 1
            firstName: "Xiaoyun",
            lastName: "Wang",
            middleName: "",
            preferredName: "larry",
            profilePic: "url", // static file on server
            ssn: "000000000", // hide show

            dob: dayjs("2015/01/01", "YYYY/MM/DD"),
            gender: "None",

            // section 2
            address: "building apt street city state zip",

            // section 3
            cellPhoneNumber: "0000000000",
            workPhoneNumber: "0000000000",
            email: "xxx@gmail.com",

            // section 4
            usCitizen: "No",
            visaTitle: "F1(CPT/OPT)",
            startDate: dayjs("2015/01/01", "YYYY/MM/DD"),
            endDate: dayjs("2015/01/02", "YYYY/MM/DD"),

            firstNameRef: "11",
            lastNameRef: "11",
            middleNameRef: "11",
            preferredNameRef: "11",
            phoneRef: "11",
            emailRef: "11",
            relationshipRef: "11",

            // section 5
            reference: [
              {
                firstName: "11",
                lastName: "11",
                middleName: "11",
                preferredName: "11",
                phone: "11",
                email: "11",
                relationship: "11",
              },
            ],
            // emergency: {
            //   firstName: "",
            //   lastName: "",
            //   middleName: "",
            //   phone: "",
            //   email: "",
            //   relationship: "",
            // },
            emergency: [
              {
                firstName: "22",
                lastName: "22",
                middleName: "22",
                preferredName: "22",
                phone: "22",
                email: "22",
                relationship: "22",
              },
            ],
          }}
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
            <Col span={16}>
              <Space style={{ width: "100%" }} align="end" direction="vertical">
                <Button type="primary" htmlType="submit">
                  submit
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default OnBoardingEmp;

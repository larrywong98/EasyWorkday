import { Space, Card, Row } from "antd";
import { Form, Typography } from "antd";
import { useMemo } from "react";
import NameSection from "../../components/NameSection";
import AddressSection from "../../components/AddressSection";
import ContactSection from "../../components/ContactSection";
import CitizenSection from "../../components/CitizenSection";
import ReferenceSection from "../../components/ReferenceSection";
import FileSection from "../../components/FileSection";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
// import FileAllSection from "../../components/FileAllSection";

const ProfileHrView = () => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.userReducer);
  const initialData = useMemo(() => {
    let tmp = { ...user.info };
    tmp.dob = dayjs(user.info.dob, "YYYY/MM/DD");
    tmp.visaDate = [
      dayjs(user.info.visaDate[0], "YYYY/MM/DD"),
      dayjs(user.info.visaDate[1], "YYYY/MM/DD"),
    ];
    return tmp;
  }, [user.info]);
  const { Title } = Typography;

  const sectionProps = {
    sectionClosed: Array(6).fill(false),
    sectionControl: () => {},
    page: "personalInfo",
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
        <Space
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Box></Box>
          <Title
            level={2}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "50px",
            }}
          >
            {user.info.firstName} {user.info.lastName}'s Profile
          </Title>
          <Link to="/hr/profile">
            <LeftOutlined />
          </Link>
        </Space>

        <Form
          id="personal"
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
          onFinish={() => {}}
          disabled={true}
        >
          <Row
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <NameSection {...sectionProps} />
            <AddressSection {...sectionProps} />
            <ContactSection {...sectionProps} />
            <CitizenSection {...sectionProps} />
            <ReferenceSection {...sectionProps} />
            <FileSection {...sectionProps} />
          </Row>
        </Form>
      </Card>
    </>
  );
};
export default ProfileHrView;

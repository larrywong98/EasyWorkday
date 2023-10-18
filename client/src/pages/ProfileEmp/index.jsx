import { Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";
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
import { fillInfo, discardFiles } from "../../reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import Feedback from "../../components/Feedback";

const ProfileEmp = () => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
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
  const [initialDataCopy, setInitialDataCopy] = useState(initialData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sectionClosed, setsectionClosed] = useState(Array(6).fill(false));
  const [initFiles, setInitFiles] = useState(user.files);
  const [action, setAction] = useState("cancel");
  const { Title } = Typography;

  const onSubmit = (data) => {
    setDisabled(true);
    if (action === "save") {
      data.profilePicture = "http://";
      data.dob = data.dob.format("YYYY/MM/DD");
      data.visaDate = [
        data.visaDate[0].format("YYYY/MM/DD"),
        data.visaDate[1].format("YYYY/MM/DD"),
      ];
      dispatch(fillInfo({ applicationStatus: status.pending, info: data }));
      navigate("/success", { state: { message: "Submit Successful" } });
    } else if (action === "cancel") {
      form.resetFields();
    }
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
  // };

  // useEffect(() => {
  //   setDisabled(checkStatus());
  // }, []);
  const onCancel = (e) => {
    setAction("cancel");
    // init files after discard
    dispatch(discardFiles({ files: initFiles }));
    // console.log(initFiles);
    // console.log(user.files);
    form.submit();
  };
  const onSave = (e) => {
    setAction("save");
    form.submit();
  };
  const onEdit = (e) => {
    setDisabled(false);
  };
  const sectionProps = {
    sectionClosed: sectionClosed,
    sectionControl: sectionControl,
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
        <Title
          level={2}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          Personal Information
        </Title>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div></div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div></div>
          </Col>
          <Col className="gutter-row" span={5}>
            <div></div>
          </Col>
          <Col className="gutter-row" span={4}>
            {disabled ? (
              <Button
                type="primary"
                style={{
                  width: "80%",
                  marginBottom: "20px",
                  justifyContent: "center",
                }}
                disabled={!disabled}
                onClick={(e) => onEdit(e)}
              >
                Edit
              </Button>
            ) : (
              <Space size="middle">
                <Button
                  type="primary"
                  style={{
                    width: "80px",
                    marginBottom: "20px",
                    justifyContent: "center",
                  }}
                  onClick={(e) => onCancel(e)}
                  danger
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  style={{
                    width: "80px",
                    marginBottom: "20px",
                    justifyContent: "center",
                  }}
                  onClick={(e) => onSave(e)}
                >
                  Save
                </Button>
              </Space>
            )}
          </Col>
        </Row>

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
          onFinish={onSubmit}
          disabled={disabled}
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
            <Col span={16}>
              <Space style={{ width: "100%" }} align="end" direction="vertical">
                <Space size="middle">
                  <Button type="primary" htmlType="submit">
                    submit
                  </Button>
                </Space>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};
export default ProfileEmp;

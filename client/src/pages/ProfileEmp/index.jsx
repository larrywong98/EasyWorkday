import { Space, Row, Col, Button, Form, Typography } from "antd";
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
import { fillInfo, discardFiles, updateUserId } from "../../reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import saveInfo from "../../services/saveInfo";

const ProfileEmp = () => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sectionClosed, setsectionClosed] = useState(Array(6).fill(false));
  const [initFiles, setInitFiles] = useState(user.files);
  const { Title } = Typography;

  const onSubmit = async (data) => {
    setDisabled(true);
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
    const newData = {
      role: user.role,
      applicationStatus: status.approved,
      onboardFeedback: user.onboardFeedback,
      info: data,
      visa: user.visa,
      files: user.files,
      createDate: user.createDate,
      lastUpdateDate: user.lastUpdateDate,
      deleteDate: user.deleteDate,
    };
    dispatch(fillInfo(newData));

    // save user
    const response = await saveInfo(user, newData);
    dispatch(updateUserId({ userId: response.userId }));
    // navigate("/success", { state: { message: "Submit Successful" } });
  };
  const sectionControl = (i) => {
    let newsectionClosed = [...sectionClosed];
    newsectionClosed[i] = !newsectionClosed[i];
    setsectionClosed(newsectionClosed);
  };
  const onCancel = (e) => {
    setDisabled(true);
    dispatch(discardFiles({ files: initFiles }));
    form.resetFields();
  };
  const onSave = (e) => {
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
  return (
    <>
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
      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "20px",
          minWidth: 580,
          maxWidth: 1600,
        }}
      >
        <Col span={16}>
          <Space style={{ width: "100%" }} align="end" direction="vertical">
            <Space size="middle">
              {disabled ? (
                <Button
                  type="primary"
                  disabled={!disabled}
                  style={{ width: "130px" }}
                  onClick={(e) => onEdit(e)}
                >
                  Edit
                </Button>
              ) : (
                <Space size="middle">
                  <Button type="primary" onClick={(e) => onCancel(e)} danger>
                    Cancel
                  </Button>
                  <Button type="primary" onClick={(e) => onSave(e)}>
                    Save
                  </Button>
                </Space>
              )}
            </Space>
          </Space>
        </Col>
      </Row>
      <Form
        id="personal"
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
                <Button type="primary" onClick={(e) => onCancel(e)} danger>
                  Cancel
                </Button>
                <Button type="primary" onClick={(e) => onSave(e)}>
                  Save
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default ProfileEmp;

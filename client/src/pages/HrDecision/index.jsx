import { Space, Card, Row } from "antd";
import { Button, Form, Typography } from "antd";
import { useMemo, useState } from "react";
import NameSection from "../../components/NameSection";
import AddressSection from "../../components/AddressSection";
import ContactSection from "../../components/ContactSection";
import CitizenSection from "../../components/CitizenSection";
import ReferenceSection from "../../components/ReferenceSection";
import FileSection from "../../components/FileSection";
import { useLocation, useNavigate } from "react-router";
import dayjs from "dayjs";
import { status } from "../../reducer/global";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import sendRequest from "../../services/sendRequest";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";

const HrDecision = () => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.userReducer);
  const userInfo = useSelector((state) => state.authReducer);
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
  const { Title } = Typography;

  const [feedback, setFeedback] = useState("");
  const [decisionStatus, setDecisionStatus] = useState("");
  const employeeId = useLocation().pathname.split("/").slice(-1)[0];

  const { TextArea } = Input;

  // const approve = () => {
  //   // db change
  //   dispatch(updateOnboardFeedback({ onboardFeedback: "" }));
  //   dispatch(updateApplicationStatus({ applicationStatus: status.approved }));
  //   dispatch(setVisa({ status: "pending", index: 0 }));
  //   dispatch(statusTrigger({ status: "pending" }));

  //   setDecisionStatus("approved");
  // };
  // const reject = () => {
  //   //db change
  //   dispatch(updateOnboardFeedback({ onboardFeedback: feedback }));
  //   dispatch(updateApplicationStatus({ applicationStatus: status.rejected }));

  //   setDecisionStatus("rejected");
  // };

  // Update application status
  const updateDecision = async (decision, reason) => {
    if (decision === "approved") {
      reason = "";
      setDecisionStatus("approved");
    }
    if (decision === "rejected") {
      setDecisionStatus("rejected");
    }
    // modify
    const response = await sendRequest({
      url: "http://127.0.0.1:4000/api/emp/appstatus/" + employeeId,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        decision: status[decision],
        reason: reason,
      }),
    });

    console.log(response);
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
          disabled={true}
          onSubmit={() => {}}
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
              {user.info.firstName} {user.info.lastName}'s Application
            </Title>
            <Link to="/hr/onboard">
              <LeftOutlined />
            </Link>
          </Space>

          <Row
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <NameSection sectionClosed={false} sectionControl={() => {}} />
            <AddressSection sectionClosed={false} sectionControl={() => {}} />
            <ContactSection sectionClosed={false} sectionControl={() => {}} />
            <CitizenSection sectionClosed={false} sectionControl={() => {}} />
            <ReferenceSection sectionClosed={false} sectionControl={() => {}} />
            <FileSection sectionClosed={false} sectionControl={() => {}} />
          </Row>
        </Form>
        <Space
          direction="row"
          style={{
            margin: "20px 0",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Feedback:
          <TextArea
            style={{ width: "300px" }}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button type="primary" onClick={() => updateDecision("approved", "")}>
            Approve
          </Button>
          <Button
            type="primary"
            onClick={() => updateDecision("rejected", feedback)}
            danger
          >
            Reject
          </Button>
        </Space>
        <Space
          direction="row"
          style={{
            margin: "20px 0",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {decisionStatus === "approved" ? (
            <Typography style={{ color: "green" }}>
              Application Approved
            </Typography>
          ) : decisionStatus === "rejected" ? (
            <Typography style={{ color: "red" }}>
              Application Rejected: {feedback}
            </Typography>
          ) : (
            ""
          )}
        </Space>
      </Card>
    </>
  );
};

export default HrDecision;

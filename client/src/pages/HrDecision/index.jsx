import { Space, Card, Row } from "antd";
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
import { useDispatch, useSelector } from "react-redux";
import md5 from "md5";
import {
  setVisa,
  updateApplicationStatus,
  updateOnboardFeedback,
} from "../../reducer/userSlice";
import { statusTrigger } from "../../reducer/statusSlice";
import { Input } from "antd";

const HrDecision = () => {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sectionClosed, setsectionClosed] = useState(Array(6).fill(false));
  const { Title } = Typography;

  const [feedback, setFeedback] = useState("");
  const [decisionStatus, setDecisionStatus] = useState("");

  const { TextArea } = Input;

  const approve = () => {
    dispatch(updateOnboardFeedback({ onboardFeedback: "" }));
    dispatch(updateApplicationStatus({ applicationStatus: status.approved }));
    dispatch(setVisa({ status: "pending", index: 0 }));
    dispatch(statusTrigger({ status: "pending" }));
    setDecisionStatus("approved");
  };
  const reject = () => {
    dispatch(updateOnboardFeedback({ onboardFeedback: feedback }));
    dispatch(updateApplicationStatus({ applicationStatus: status.rejected }));
    setDecisionStatus("rejected");
  };

  const sectionControl = (i) => {
    let newsectionClosed = [...sectionClosed];
    newsectionClosed[i] = !newsectionClosed[i];
    setsectionClosed(newsectionClosed);
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
          <Button type="primary" onClick={() => approve()}>
            Approve
          </Button>
          <Button type="primary" onClick={() => reject()} danger>
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
        ></Space>
      </Card>
    </>
  );
};

export default HrDecision;

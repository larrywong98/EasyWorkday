import { Button, Card, Col, Form, Input } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";

const ContactSection = (props) => {
  const location = useLocation();
  const sectionClosed = props.sectionClosed;
  const sectionControl = props.sectionControl;
  const requiredItem = [
    {
      required: true,
    },
  ];
  const inputFields = [
    { label: "Cell phone", name: "cellPhoneNumber", rules: requiredItem },
    { label: "Work phone", name: "workPhoneNumber", rules: [] },
    { label: "Email", name: "email", rules: requiredItem },
  ];
  return (
    <Col span={16}>
      <Card
        type="inner"
        title="Contact Info"
        extra={
          <Button
            icon={sectionClosed[2] ? <PlusOutlined /> : <MinusOutlined />}
            onClick={() => sectionControl(2)}
          ></Button>
        }
      >
        {inputFields.map((item, index) => (
          <Form.Item
            key={index}
            hidden={sectionClosed[2]}
            label={item.label}
            name={item.name}
            rules={item.rules}
          >
            {item.name === "email" && location.pathname.includes("onboard") ? (
              <Input disabled={true} />
            ) : (
              <Input />
            )}
          </Form.Item>
        ))}
      </Card>
    </Col>
  );
};
export default ContactSection;

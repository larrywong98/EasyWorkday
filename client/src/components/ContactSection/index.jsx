import { Button, Card, Col, Form, Input, Radio } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const ContactSection = (props) => {
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
            label={item.label}
            name={item.name}
            hidden={sectionClosed[2]}
            rules={item.rules}
          >
            <Input />
          </Form.Item>
        ))}
      </Card>
    </Col>
  );
};
export default ContactSection;

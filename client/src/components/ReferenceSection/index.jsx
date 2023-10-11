import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Space,
  Typography,
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const ReferenceSection = (props) => {
  const sectionClosed = props.sectionClosed;
  const sectionControl = props.sectionControl;
  const requiredItem = [
    {
      required: true,
    },
  ];
  const inputFields = [
    { label: "First Name", name: "firstNameRef", rules: requiredItem },
    { label: "Middle Name", name: "middleNameRef", rules: [] },
    { label: "Last Name", name: "lastNameRef", rules: requiredItem },
    { label: "Preferred Name", name: "preferredNameRef", rules: [] },
    { label: "phone", name: "phoneRef", rules: [] },
    { label: "Email", name: "emailRef", rules: [] },
    { label: "Relationship", name: "relationshipRef", rules: requiredItem },
  ];
  return (
    <Col span={16}>
      <Card
        type="inner"
        title="Reference"
        extra={
          <Button
            icon={sectionClosed[4] ? <PlusOutlined /> : <MinusOutlined />}
            onClick={() => sectionControl(4)}
          ></Button>
        }
      >
        {inputFields.map((item, index) => (
          <Form.Item
            key={index}
            label={item.label}
            name={item.name}
            hidden={sectionClosed[4]}
            rules={item.rules}
          >
            <Input />
          </Form.Item>
        ))}

        {sectionClosed[4] ? <></> : <Divider></Divider>}
        <Form.Item hidden={sectionClosed[4]}>
          <Typography
            style={{
              margin: "20px",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Emergency contacts
          </Typography>
        </Form.Item>
        <Form.List name="emergency" fields={["1"]}>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <Form.Item hidden={sectionClosed[4]}>
                      <Typography
                        style={{
                          margin: "20px",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        #{index + 1}
                      </Typography>
                    </Form.Item>
                    {inputFields.map((item, innerindex) => (
                      <Form.Item
                        key={innerindex}
                        label={item.label}
                        name={[index, item.name]}
                        hidden={sectionClosed[4]}
                        rules={item.rules}
                      >
                        <Input />
                      </Form.Item>
                    ))}

                    <Space
                      direction="vertical"
                      align="end"
                      style={{ width: "100%" }}
                    >
                      {fields.length > 1 ? (
                        <Button
                          type="primary"
                          onClick={() => remove(field.name)}
                          danger
                        >
                          Remove
                        </Button>
                      ) : null}
                    </Space>
                    {sectionClosed[4] ? <></> : <Divider></Divider>}
                  </div>
                ))}

                <Space
                  direction="vertical"
                  align="end"
                  style={{ width: "100%" }}
                >
                  {fields.length < 2 ? (
                    <Form.Item hidden={sectionClosed[4]}>
                      <Button onClick={() => add()}>
                        <PlusOutlined /> Add
                      </Button>
                    </Form.Item>
                  ) : (
                    <></>
                  )}
                </Space>
              </div>
            );
          }}
        </Form.List>
      </Card>
    </Col>
  );
};
export default ReferenceSection;

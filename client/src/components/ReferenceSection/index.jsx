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
import validateEmail from "../../utils/validateEmail";
const ReferenceSection = (props) => {
  const sectionClosed = props.sectionClosed;
  const sectionControl = props.sectionControl;
  const validatePhone = ({ getFieldValue }) => ({
    validator(rule, value) {
      if ((value.length === 10 && /^\d+$/.test(value)) || value === "") {
        return Promise.resolve();
      }
      return Promise.reject("Cell Phone not valid");
    },
  });
  const validateRefEmail = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (validateEmail(value)) {
        return Promise.resolve();
      }
      return Promise.reject("Email not valid");
    },
  });
  const inputFields = [
    {
      label: "First Name",
      name: "firstName",
      rules: [{ required: true, message: "First Name is required" }],
    },
    { label: "Middle Name", name: "middleName", rules: [] },
    {
      label: "Last Name",
      name: "lastName",
      rules: [{ required: true, message: "Last Name is required" }],
    },
    { label: "Preferred Name", name: "preferredName", rules: [] },
    {
      label: "phone",
      name: "phone",
      rules: [{ required: false }, validatePhone],
    },
    {
      label: "Email",
      name: "email",
      rules: [{ required: false }, validateRefEmail],
    },
    {
      label: "Relationship",
      name: "relationship",
      rules: [{ required: true, message: "Relationship is required" }],
    },
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
        <Form.List name="reference">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index, ...restField) => (
                <div key={field.key}>
                  {inputFields.map((item, innerIndex) => (
                    <Form.Item
                      key={innerIndex}
                      label={item.label}
                      name={[index, item.name]}
                      hidden={sectionClosed[4]}
                      rules={item.rules}
                    >
                      <Input />
                    </Form.Item>
                  ))}
                </div>
              ))}
            </>
          )}
        </Form.List>

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
        <Form.List name="emergency">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index, ...restField) => (
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

              <Space direction="vertical" align="end" style={{ width: "100%" }}>
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
            </>
          )}
        </Form.List>
      </Card>
    </Col>
  );
};
export default ReferenceSection;

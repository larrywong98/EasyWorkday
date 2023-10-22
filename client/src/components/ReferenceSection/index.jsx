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
    { label: "First Name", name: "firstName", rules: requiredItem },
    { label: "Middle Name", name: "middleName", rules: [] },
    { label: "Last Name", name: "lastName", rules: requiredItem },
    { label: "Preferred Name", name: "preferredName", rules: [] },
    { label: "phone", name: "phone", rules: [] },
    { label: "Email", name: "email", rules: [] },
    { label: "Relationship", name: "relationship", rules: requiredItem },
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
                      {/* {user.applicationStatus === status.initial ? (
                          <Input />
                        ) : ( */}
                      <Input />
                      {/* )} */}
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

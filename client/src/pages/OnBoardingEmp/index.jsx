import {
  Breadcrumb,
  Space,
  Radio,
  DatePicker,
  Upload,
  Card,
  InputNumber,
  Divider,
  Layout,
  Row,
  Col,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { UploadOutlined } from "@ant-design/icons";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// import Input from "../../components/Input";
import { Button, Form, Input, Typography } from "antd";
import { Container, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import InputComp from "../../components/InputComp";
import FormItem from "antd/es/form/FormItem";
import UploadComp from "../../components/UploadComp";

const OnBoardingEmp = () => {
  // const { register, handleSubmit, control } = useForm();
  const [formData, setFormData] = useState();
  const [form] = Form.useForm();
  const [gender, setGender] = useState("");
  const [citizen, setCitizen] = useState("");
  const [visa, setVisa] = useState("");
  const [ssnValue, setSsnValue] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState(["#1"]);
  const [sectionClosed, setsectionClosed] = useState(Array(6).fill(false));
  const { Title } = Typography;
  const { RangePicker } = DatePicker;
  const onSubmit = (data) => {
    data.profilePic = "http://";
    console.log(data);
    setFormData(data);
  };
  const sectionControl = (i) => {
    let newsectionClosed = [...sectionClosed];
    newsectionClosed[i] = !newsectionClosed[i];
    setsectionClosed(newsectionClosed);
  };
  const requiredItem = [
    {
      required: true,
    },
  ];
  // const uploadProps = {
  //   action: "http://127:0.0.1:4000/api/upload",
  //   onChange(info) {
  //     if (info.file.status === "done") {
  //       console.log(info.file, info.fileList);
  //     }
  //   },
  //   defaultFileList: [
  //     {
  //       uid: "2",
  //       name: "yyy.png",
  //       status: "done",
  //       url: "http://www.baidu.com/yyy.png",
  //     },
  //   ],
  // };
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
            minWidth: 800,
            maxWidth: 1600,
          }}
          layout="horizontal"
          form={form}
          onFinish={onSubmit}
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
            <Col span={16}>
              <Card
                type="inner"
                title="Name"
                extra={
                  <Button
                    icon={
                      sectionClosed[0] ? <PlusOutlined /> : <MinusOutlined />
                    }
                    onClick={() => sectionControl(0)}
                  ></Button>
                }
              >
                <>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    hidden={sectionClosed[0]}
                    rules={requiredItem}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Middle Name"
                    name="middleName"
                    hidden={sectionClosed[0]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={requiredItem}
                    hidden={sectionClosed[0]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Preferred Name"
                    name="preferredName"
                    hidden={sectionClosed[0]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Profile Picture"
                    name="profilePic"
                    hidden={sectionClosed[0]}
                  >
                    <UploadComp listType="picture-circle" />
                  </Form.Item>

                  <Form.Item
                    label="SSN"
                    name="ssn"
                    rules={requiredItem}
                    hidden={sectionClosed[0]}
                  >
                    <Input
                      status={
                        !formData
                          ? ""
                          : formData.ssn.length !== 9
                          ? "error"
                          : ""
                      }
                      value={ssnValue}
                      onChange={(e) => setSsnValue(e.target.value)}
                      style={{ width: "150px" }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Date of Birth"
                    name="dob"
                    rules={requiredItem}
                    hidden={sectionClosed[0]}
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item
                    label="Gender"
                    name="gender"
                    rules={requiredItem}
                    hidden={sectionClosed[0]}
                  >
                    <Radio.Group
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                    >
                      <Radio.Button
                        value="Male"
                        onChange={() => setCitizen("Male")}
                      >
                        Male
                      </Radio.Button>
                      <Radio.Button
                        value="Female"
                        onChange={() => setCitizen("Female")}
                      >
                        Female
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </>
              </Card>
            </Col>
            <Col span={16}>
              <Card
                type="inner"
                title="Address"
                extra={
                  <Button
                    icon={
                      sectionClosed[1] ? <PlusOutlined /> : <MinusOutlined />
                    }
                    onClick={() => sectionControl(1)}
                  ></Button>
                }
              >
                <Form.Item
                  label="Address"
                  name="address"
                  rules={requiredItem}
                  hidden={sectionClosed[1]}
                >
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={16}>
              <Card
                type="inner"
                title="Contact Info"
                extra={
                  <Button
                    icon={
                      sectionClosed[2] ? <PlusOutlined /> : <MinusOutlined />
                    }
                    onClick={() => sectionControl(2)}
                  ></Button>
                }
              >
                <Form.Item
                  label="Cell phone"
                  name="cellPhoneNumber"
                  rules={requiredItem}
                  hidden={sectionClosed[2]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Work phone"
                  name="workPhoneNumber"
                  hidden={sectionClosed[2]}
                >
                  <Input />
                </Form.Item>
                {/* prefilled */}
                <Form.Item
                  label="Email"
                  name="email"
                  rules={requiredItem}
                  hidden={sectionClosed[2]}
                >
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={16}>
              <Card
                title="Employment"
                extra={
                  <Button
                    icon={
                      sectionClosed[3] ? <PlusOutlined /> : <MinusOutlined />
                    }
                    onClick={() => sectionControl(3)}
                  ></Button>
                }
              >
                <Form.Item
                  label="Citizen of the U.S.?"
                  name="usCitizen"
                  rules={requiredItem}
                  hidden={sectionClosed[3]}
                >
                  <Radio.Group
                    onChange={(e) => setCitizen(e.target.value)}
                    value={citizen}
                  >
                    <Radio.Button
                      value="Yes"
                      onChange={() => setCitizen("Yes")}
                    >
                      Yes
                    </Radio.Button>
                    <Radio.Button value="No" onChange={() => setCitizen("No")}>
                      No
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
                {citizen === "Yes" ? (
                  <Form.Item
                    name="visaTitle"
                    rules={requiredItem}
                    hidden={sectionClosed[3]}
                  >
                    <Radio.Group style={{ marginLeft: "50px" }}>
                      <Radio value="Green Card">Green Card</Radio>
                      <Radio value="Citizen">Citizen</Radio>
                    </Radio.Group>
                  </Form.Item>
                ) : citizen === "No" ? (
                  <>
                    <Form.Item
                      name="visaTitle"
                      rules={requiredItem}
                      hidden={sectionClosed[3]}
                    >
                      <Radio.Group value={visa} style={{ marginLeft: "50px" }}>
                        <Space direction="vertical">
                          <Radio value="H1-B" onChange={() => setVisa("H1-B")}>
                            H1-B
                          </Radio>
                          <Radio value="L2" onChange={() => setVisa("L2")}>
                            L2
                          </Radio>
                          <Radio
                            value="F1(CPT/OPT)"
                            onChange={() => setVisa("F1(CPT/OPT)")}
                          >
                            F1(CPT/OPT)
                          </Radio>
                          <Radio value="H4" onChange={() => setVisa("H4")}>
                            H4
                          </Radio>
                          <Radio
                            value="Other"
                            onChange={() => setVisa("Other")}
                          >
                            Other
                            <Input
                              style={{
                                width: 100,
                                marginLeft: 10,
                              }}
                              disabled={visa === "Other" ? false : true}
                            />
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item name="visaDate" hidden={sectionClosed[3]}>
                      <RangePicker />
                    </Form.Item>
                  </>
                ) : (
                  <></>
                )}
              </Card>
            </Col>
            <Col span={16}>
              <Card
                type="inner"
                title="Reference"
                extra={
                  <Button
                    icon={
                      sectionClosed[4] ? <PlusOutlined /> : <MinusOutlined />
                    }
                    onClick={() => sectionControl(4)}
                  ></Button>
                }
              >
                <Form.Item
                  label="First Name"
                  name="firstNameRef"
                  rules={requiredItem}
                  hidden={sectionClosed[4]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="lastNameRef"
                  rules={requiredItem}
                  hidden={sectionClosed[4]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Middle Name"
                  name="middleNameRef"
                  hidden={sectionClosed[4]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phoneRef"
                  hidden={sectionClosed[4]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="emailRef"
                  hidden={sectionClosed[4]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Relationship"
                  name="relationshipRef"
                  rules={requiredItem}
                  hidden={sectionClosed[4]}
                >
                  <Input />
                </Form.Item>
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

                            <Form.Item
                              name={[index, "First Name"]}
                              label="First Name"
                              rules={[{ required: true }]}
                              hidden={sectionClosed[4]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              name={[index, "Middle Name"]}
                              label="Middle Name"
                              hidden={sectionClosed[4]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              name={[index, "Last Name"]}
                              label="Last Name"
                              rules={[{ required: true }]}
                              hidden={sectionClosed[4]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              label="Phone"
                              name={[index, "Phone"]}
                              hidden={sectionClosed[4]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              label="Email"
                              name={[index, "Email"]}
                              hidden={sectionClosed[4]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              label="Relationship"
                              name={[index, "Relationship"]}
                              hidden={sectionClosed[4]}
                              rules={requiredItem}
                            >
                              <Input />
                            </Form.Item>
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
            <Col span={16}>
              <Card
                type="inner"
                title="Files summary"
                extra={
                  <Button
                    icon={
                      sectionClosed[5] ? <PlusOutlined /> : <MinusOutlined />
                    }
                    onClick={() => sectionControl(5)}
                  ></Button>
                }
              >
                {sectionClosed[5] ? (
                  <></>
                ) : (
                  <>
                    <Upload
                      name="file"
                      action="http://127.0.0.1:4000/api/upload"
                      onChange={(info) => {
                        if (info.file.status === "done") {
                          console.log(info.file, info.fileList);
                        }
                      }}
                      defaultFileList={[
                        {
                          uid: "2",
                          name: "yyy.png",
                          status: "done",
                          url: "http://www.baidu.com/yyy.png",
                        },
                      ]}
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </>
                )}
              </Card>
            </Col>

            <Space style={{ width: "100%" }} align="end" direction="vertical">
              <Button type="primary" htmlType="submit">
                submit
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default OnBoardingEmp;

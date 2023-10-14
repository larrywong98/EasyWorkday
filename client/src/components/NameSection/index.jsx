import { Button, Card, Col, DatePicker, Form, Input, Radio } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import UploadComp from "../UploadComp";
import { useState } from "react";
import { useSelector } from "react-redux";

const NameSection = (props) => {
  const sectionClosed = props.sectionClosed;
  const requiredItem = [
    {
      required: true,
    },
  ];
  const [gender, setGender] = useState("");
  const user = useSelector((state) => state.userReducer);

  const inputFields = [
    { label: "First Name", name: "firstName", rules: requiredItem },
    { label: "Middle Name", name: "middleName", rules: [] },
    { label: "Last Name", name: "lastName", rules: requiredItem },
    { label: "Preferred Name", name: "preferredName", rules: [] },
  ];
  return (
    <Col span={16}>
      <Card
        type="inner"
        title="Name"
        extra={
          <Button
            icon={sectionClosed[0] ? <PlusOutlined /> : <MinusOutlined />}
            onClick={() => props.sectionControl(0)}
          ></Button>
        }
      >
        <>
          {inputFields.map((item, index) => (
            <Form.Item
              key={index}
              label={item.label}
              name={item.name}
              hidden={sectionClosed[0]}
              rules={item.rules}
            >
              <Input />
            </Form.Item>
          ))}
          <Form.Item
            label="Profile Picture"
            name="profilePicture"
            hidden={sectionClosed[0]}
          >
            <UploadComp name="ProfilePicture" listType="picture-circle" />
          </Form.Item>

          <Form.Item
            label="SSN"
            name="ssn"
            rules={requiredItem}
            hidden={sectionClosed[0]}
          >
            <Input style={{ width: "150px" }} />
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
              <Radio.Button value="Male" onChange={() => setGender("Male")}>
                Male
              </Radio.Button>
              <Radio.Button value="Female" onChange={() => setGender("Female")}>
                Female
              </Radio.Button>
              <Radio.Button value="None" onChange={() => setGender("None")}>
                I do not wish to Answer
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </>
      </Card>
    </Col>
  );
};
export default NameSection;

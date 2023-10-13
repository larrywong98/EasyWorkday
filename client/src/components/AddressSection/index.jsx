import { Button, Card, Col, DatePicker, Form, Input, Radio } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useState } from "react";

const AddressSection = (props) => {
  const sectionClosed = props.sectionClosed;
  const sectionControl = props.sectionControl;
  const requiredItem = [
    {
      required: true,
    },
  ];
  return (
    <Col span={16}>
      <Card
        type="inner"
        title="Address"
        extra={
          <Button
            icon={sectionClosed[1] ? <PlusOutlined /> : <MinusOutlined />}
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
  );
};
export default AddressSection;

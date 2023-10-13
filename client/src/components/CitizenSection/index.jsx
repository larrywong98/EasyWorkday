import { Button, Card, Col, DatePicker, Form, Input, Radio, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsCitizen } from "../../reducer/userSlice";

const CitizenSection = (props) => {
  const sectionClosed = props.sectionClosed;
  const sectionControl = props.sectionControl;
  const dispatch = useDispatch();
  const requiredItem = [
    {
      required: true,
    },
  ];
  const { RangePicker } = DatePicker;
  const citizen = useSelector((state) => state.userReducer.data.usCitizen);
  const [visa, setVisa] = useState("");

  return (
    <Col span={16}>
      <Card
        title="Residency"
        extra={
          <Button
            icon={sectionClosed[3] ? <PlusOutlined /> : <MinusOutlined />}
            onClick={() => sectionControl(3)}
          ></Button>
        }
      >
        <Form.Item
          label="Citizen of the U.S."
          name="usCitizen"
          rules={requiredItem}
          hidden={sectionClosed[3]}
        >
          <Radio.Group
            onChange={(e) =>
              dispatch(updateUsCitizen({ usCitizen: e.target.value }))
            }
            value={citizen}
          >
            <Radio.Button
              value="Yes"
              onChange={() => dispatch(updateUsCitizen({ usCitizen: "Yes" }))}
            >
              Yes
            </Radio.Button>
            <Radio.Button
              value="No"
              onChange={() => dispatch(updateUsCitizen({ usCitizen: "No" }))}
            >
              No
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        {citizen === "Yes" ? (
          <Form.Item
            label="GC"
            name="visaTitle"
            rules={requiredItem}
            hidden={sectionClosed[3]}
          >
            <Radio.Group>
              <Radio value="Green Card">Green Card</Radio>
              <Radio value="Citizen">Citizen</Radio>
            </Radio.Group>
          </Form.Item>
        ) : citizen === "No" ? (
          <>
            <Form.Item
              label="Visa"
              name="visaTitle"
              rules={requiredItem}
              hidden={sectionClosed[3]}
            >
              <Radio.Group value={visa}>
                <Space direction="vertical" style={{ marginTop: "7px" }}>
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
                  <Radio value="Other" onChange={() => setVisa("Other")}>
                    Other
                    <Input
                      style={{
                        width: 100,
                        marginLeft: 10,
                      }}
                      onChange={(e) => {}}
                      disabled={visa === "Other" ? false : true}
                    />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Start and End Date"
              name="visaDate"
              hidden={sectionClosed[3]}
            >
              <RangePicker />
            </Form.Item>
          </>
        ) : (
          <></>
        )}
      </Card>
    </Col>
  );
};
export default CitizenSection;

import { Button, Card, Col, DatePicker, Form, Input, Radio, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateUsCitizen, updateVisaTitle } from "../../reducer/userSlice";
import UploadComp from "../UploadComp";
import dayjs from "dayjs";
import { useState } from "react";

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
  const storedCitizen = useSelector(
    (state) => state.userReducer.info.usCitizen
  );
  const [citizen, setCitizen] = useState(storedCitizen);
  const storedVisaTitle = useSelector(
    (state) => state.userReducer.info.visaTitle
  );
  const [visaTitle, setVisaTitle] = useState(storedVisaTitle);
  const userFiles = useSelector((state) => state.userReducer.files);

  const validateVisaRange = ({ getFieldValue }) => ({
    validator(rule) {
      const visaDate = getFieldValue("visaDate");
      if (visaDate[0] === "" || visaDate[1] === "") {
        return Promise.reject("Visa Date is required");
      }
      if (visaDate[1] <= dayjs().startOf("day")) {
        return Promise.reject("Visa End Date cannot be earlier than today");
      }
      return Promise.resolve();
    },
  });
  const validateOptUpload = ({ getFieldValue }) => ({
    validator(rule) {
      if (userFiles[3].length === 0) {
        return Promise.reject("Opt receipt required");
      }
      return Promise.resolve();
    },
  });
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
            onChange={(e) => setCitizen(e.target.value)}
            value={citizen}
          >
            <Radio.Button value="Yes" onChange={() => setCitizen("Yes")}>
              Yes
            </Radio.Button>
            <Radio.Button value="No" onChange={() => setCitizen("Yes")}>
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
              <Radio.Group value={visaTitle}>
                <Space direction="vertical" style={{ marginTop: "7px" }}>
                  <Radio value="H1-B" onChange={() => setVisaTitle("H1-B")}>
                    H1-B
                  </Radio>
                  <Radio value="L2" onChange={() => setVisaTitle("L2")}>
                    L2
                  </Radio>
                  <Radio
                    value="F1(CPT/OPT)"
                    onChange={() => setVisaTitle("F1(CPT/OPT)")}
                  >
                    F1(CPT/OPT)
                  </Radio>
                  <Radio value="H4" onChange={() => setVisaTitle("H4")}>
                    H4
                  </Radio>
                  <Radio value="Other" onChange={() => setVisaTitle("Other")}>
                    Other
                    <Input
                      style={{
                        width: 100,
                        marginLeft: 10,
                      }}
                      onChange={(e) => {}}
                      disabled={visaTitle === "Other" ? false : true}
                    />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            {visaTitle === "F1(CPT/OPT)" ? (
              <Form.Item
                label="Opt Receipt"
                name="optReceipt"
                hidden={sectionClosed[3]}
                rules={[{}, validateOptUpload]}
                required
              >
                <UploadComp name="Opt" listType="picture-card" />
              </Form.Item>
            ) : (
              <></>
            )}
            <Form.Item
              label="Start and End Date"
              name="visaDate"
              hidden={sectionClosed[3]}
              rules={[...requiredItem, validateVisaRange]}
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

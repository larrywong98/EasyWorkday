import { Button, Card, Col, DatePicker, Form, Input, Radio, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsCitizen, updateVisaTitle } from "../../reducer/userSlice";
import UploadComp from "../UploadComp";

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
  const citizen = useSelector((state) => state.userReducer.info.usCitizen);
  // const initVisa = useSelector((state) => state.userReducer.info.visaTitle);
  // const [visa, setVisa] = useState(initVisa);
  const visaTitle = useSelector((state) => state.userReducer.info.visaTitle);

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
              <Radio.Group value={visaTitle}>
                <Space direction="vertical" style={{ marginTop: "7px" }}>
                  <Radio
                    value="H1-B"
                    onChange={() =>
                      dispatch(updateVisaTitle({ visaTitle: "H1-B" }))
                    }
                  >
                    H1-B
                  </Radio>
                  <Radio
                    value="L2"
                    onChange={() =>
                      dispatch(updateVisaTitle({ visaTitle: "L2" }))
                    }
                  >
                    L2
                  </Radio>
                  <Radio
                    value="F1(CPT/OPT)"
                    onChange={() =>
                      dispatch(updateVisaTitle({ visaTitle: "F1(CPT/OPT)" }))
                    }
                  >
                    F1(CPT/OPT)
                  </Radio>
                  <Radio
                    value="H4"
                    onChange={() =>
                      dispatch(updateVisaTitle({ visaTitle: "H4" }))
                    }
                  >
                    H4
                  </Radio>
                  <Radio
                    value="Other"
                    onChange={() =>
                      dispatch(updateVisaTitle({ visaTitle: "Other" }))
                    }
                  >
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
              <Form.Item label="Opt Receipt" hidden={sectionClosed[3]}>
                <UploadComp name="Opt" listType="picture-card" />
              </Form.Item>
            ) : (
              <></>
            )}

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

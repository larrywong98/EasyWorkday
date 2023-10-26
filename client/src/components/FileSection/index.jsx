import { Button, Card, Col, Form } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import UploadComp from "../UploadComp";
import { useMemo } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

const FileSection = (props) => {
  const sectionClosed = props.sectionClosed;
  const sectionControl = props.sectionControl;
  const location = useLocation();
  const visaTitle = useSelector((state) => state.userReducer.visaTitle);
  const fileFields = useMemo(() => {
    if (location.pathname.includes("/emp/profile")) {
      if (visaTitle === "Green Card" || visaTitle === "Citizen") {
        return [
          {
            name: "Profile Picture",
            linkName: "ProfilePicture",
            listType: "picture-circle",
          },
          {
            name: "Driver License",
            linkName: "DriverLicense",
          },
        ];
      } else if (visaTitle === "F1(CPT/OPT)") {
        return [
          {
            name: "Profile Picture",
            linkName: "ProfilePicture",
            listType: "picture-circle",
          },
          {
            name: "Driver License",
            linkName: "DriverLicense",
          },
          {
            name: "Work Authorization",
            linkName: "WorkAuthorization",
          },
        ];
      } else {
        return [
          {
            name: "Profile Picture",
            linkName: "ProfilePicture",
            listType: "picture-circle",
          },
          {
            name: "Driver License",
            linkName: "DriverLicense",
          },
          {
            name: "Work Authorization",
            linkName: "WorkAuthorization",
          },
          {
            name: "OPT Receipt",
            linkName: "Opt",
          },
          {
            name: "EAD",
            linkName: "Ead",
          },
          {
            name: "I-983",
            linkName: "I983",
          },
          {
            name: "I-20",
            linkName: "I20",
          },
        ];
      }
    } else {
      return [
        {
          name: "Profile Picture",
          linkName: "ProfilePicture",
          listType: "picture-circle",
        },
        {
          name: "Driver License",
          linkName: "DriverLicense",
        },
        {
          name: "Work Authorization",
          linkName: "WorkAuthorization",
        },
        {
          name: "OPT Receipt",
          linkName: "Opt",
        },
      ];
    }
  }, []);
  return (
    <Col span={16}>
      <Card
        type="inner"
        title="Files Summary"
        extra={
          <Button
            icon={sectionClosed[5] ? <PlusOutlined /> : <MinusOutlined />}
            onClick={() => sectionControl(5)}
          ></Button>
        }
      >
        {sectionClosed[5] ? (
          <></>
        ) : (
          <>
            {fileFields.map((item, index) => (
              <Form.Item key={index} label={item.name}>
                <UploadComp
                  name={item.linkName}
                  listType={item.listType || "picture-card"}
                />
              </Form.Item>
            ))}
          </>
        )}
      </Card>
    </Col>
  );
};
export default FileSection;

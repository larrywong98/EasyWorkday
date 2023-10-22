import { Button, Card, Col, Form, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import UploadComp from "../UploadComp";

const FileSection = (props) => {
  const sectionClosed = props.sectionClosed;
  const sectionControl = props.sectionControl;
  const fileFields = [
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
              <Form.Item label={item.name}>
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

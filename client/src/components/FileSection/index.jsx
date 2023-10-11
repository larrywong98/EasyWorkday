import { Button, Card, Col, Upload } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
const FileSection = (props) => {
  const sectionClosed = props.sectionClosed;
  const sectionControl = props.sectionControl;

  return (
    <Col span={16}>
      <Card
        type="inner"
        title="Files summary"
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
  );
};
export default FileSection;

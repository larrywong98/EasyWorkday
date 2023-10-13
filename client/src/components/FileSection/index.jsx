import { Button, Card, Col, Input, Space, Typography, Upload } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateDriverLicense } from "../../reducer/userSlice";
import { useEffect, useState } from "react";

const FileSection = (props) => {
  const sectionClosed = props.sectionClosed;
  const sectionControl = props.sectionControl;
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);

  const onUploadChange = (info, name, id) => {
    if (info.file.status === "done") {
      const value = {
        uid: id,
        name: name,
        status: info.file.status,
        url: info.file.response.fileUrl,
      };
      dispatch(
        updateDriverLicense({
          driverLicense: value,
        })
      );
    }
  };
  const onRemove = (id) => {
    if (id === 1) {
      dispatch(
        updateDriverLicense({
          driverLicense: {
            uid: "",
            name: "",
            status: "",
            url: "",
          },
        })
      );
    }
    if (id === 2) {
    }
  };
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
            <Space direction="vertical">
              {/* <Space>
                <Typography>Profile Picture</Typography>
                <a href={user.profilePic.url}>ProfilePictureLink</a>
              </Space> */}
              {[
                {
                  name: "Profile Picture",
                  linkName: "ProfilePicture.png",
                  id: "1",
                  fileList: [],
                },
                {
                  name: "Driver License",
                  linkName: "DriverLicense.png",
                  id: "2",
                },
                {
                  name: "Work Authorization",
                  linkName: "WorkAuthorization.png",
                  id: "3",
                },
              ].map((item, index) => (
                <Space key={index} size="middle">
                  <Space
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "150px",
                    }}
                  >
                    <Typography>{item.name}</Typography>
                  </Space>
                  <Space style={{ display: "flex", alignItems: "center" }}>
                    <Upload
                      name="file"
                      maxCount={1}
                      listType="picture-card"
                      action="http://127.0.0.1:4000/api/upload"
                      onChange={(info) =>
                        onUploadChange(info, item.linkName, item.id)
                      }
                      onRemove={() => onRemove(index)}
                    >
                      <div>
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </div>
                    </Upload>
                  </Space>
                </Space>
              ))}
            </Space>
          </>
        )}
      </Card>
    </Col>
  );
};
export default FileSection;

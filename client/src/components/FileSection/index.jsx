import { Button, Card, Col, Input, Space, Typography, Upload } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFile,
  updateDriverLicense,
  updateFile,
} from "../../reducer/userSlice";
import { useEffect, useState } from "react";
import UploadComp from "../UploadComp";
import { fileName } from "../../reducer/global";

const FileSection = (props) => {
  const sectionClosed = props.sectionClosed;
  const sectionControl = props.sectionControl;
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
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
            <Space direction="vertical">
              {fileFields.map((item, index) => (
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
                    <UploadComp
                      name={item.linkName}
                      listType={item.listType || "picture-card"}
                    />
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

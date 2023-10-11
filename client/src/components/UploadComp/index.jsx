import { Upload } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
const UploadComp = (props) => {
  const [loading, setLoading] = useState(false);
  //   const [previewUrl, setPreviewUrl] = useState("");

  const beforeUpload = (file) => {
    // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    // if (!isJpgOrPng) {
    //   console.log("You can only upload JPG/PNG file!");
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.log("Image must smaller than 2MB!");
    }
    return isLt2M;
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      console.log(info.file.response);
      //   setPreviewUrl(info.file.response);
      //   getBase64(info.file.originFileObj, (url) => {
      //     setLoading(false);
      //     // setImageUrl(url);
      //     // console.log(url);
      //   });
    }
  };
  const request = async () => {
    // const response = await fetch('http://127.0.0.1:4000/api/upload')
  };
  return (
    <>
      <Upload
        name="file"
        // customRequest={request}
        // loading={loading}
        action="http://127.0.0.1:4000/api/upload"
        showUploadList={true}
        maxCount={1}
        listType={props.listType}
        onChange={handleChange}
        beforeUpload={beforeUpload}
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
    </>
  );
};
export default UploadComp;

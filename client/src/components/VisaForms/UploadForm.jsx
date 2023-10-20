import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { useDispatch } from "react-redux";
import { removeFile, updateFile } from "../../reducer/userSlice";

const UploadForm = ({ name }) => {
  const [fileList, setFileList] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const handleUpload = () => {
    const formData = new FormData();

    formData.append("file", fileList[0]);
    setFileName(fileList[0].name);
    // console.log(file);
    setUploading(true); // You can use any AJAX library you like
    fetch("http://144.202.42.97:8001/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        const result = res.json();
        console.log(result);
        return result;
      })
      .then((res) => {
        setFileList([]);
        setFileUrl(res.fileUrl);
        message.success("upload successfully.");
        dispatch(
          updateFile({
            name: name,
            fileInfo: {
              name: name,
              status: "done",
              url: res.fileUrl,
            },
          })
        );
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props = {
    onRemove: (file) => {
      setFileList([]);
      dispatch(removeFile({ name: name }));
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
  };

  return (
    <>
      <Upload {...props} fileList={fileList}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
      <div>
        {fileUrl && (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileName}
          </a>
        )}
      </div>
    </>
  );
};

export default UploadForm;

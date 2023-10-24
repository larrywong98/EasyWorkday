import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { removeFile, updateFile } from "../../reducer/userSlice";
import { updateVisaFile } from "../../services/visa";
import { useNavigate } from "react-router";
import { fileName as fileNameMap } from "../../reducer/global";

const UploadForm = ({ name }) => {
  const [fileList, setFileList] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const userId = useSelector((state) => state.authReducer.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpload = () => {
    const formData = new FormData();

    formData.append("file", fileList[0]);
    setFileName(fileList[0].name);
    setUploading(true); // You can use any AJAX library you like
    fetch("http://144.202.42.97:8001/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        const result = res.json();
        // console.log(result);
        return result;
      })
      .then(async (res) => {
        setFileList([]);
        setFileUrl(res.fileUrl);

        let newFileInfo = {
          name: name,
          status: "done",
          url: res.fileUrl,
        };
        message.success("upload successfully.");
        // dispatch
        dispatch(
          updateFile({
            name: name,
            fileInfo: newFileInfo,
          })
        );

        const response = await updateVisaFile(
          fileNameMap[name],
          userId,
          newFileInfo,
          navigate
        );

        console.log("res" + res);
      })
      .catch((err) => {
        console.log(err.message);
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

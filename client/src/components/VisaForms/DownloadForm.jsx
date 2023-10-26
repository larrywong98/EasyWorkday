import React from "react";
import { Form, Button } from "antd";

// Download Template files
const DownloadForm = ({ url, text }) => {
  const downloadFileAtUrl = (url) => {
    const filename = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", filename);
    aTag.setAttribute("target", "_blank");
    document.body.appendChild(aTag);
    aTag.click();
    document.body.removeChild(aTag);
  };
  return (
    <Form.Item label={text && `Download ${text}`}>
      <Button
        onClick={() => downloadFileAtUrl(url)}
        style={{ marginRight: "5%" }}
      >
        Download
      </Button>
    </Form.Item>
  );
};

export default DownloadForm;

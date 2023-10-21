import React from "react";
import { Button } from "antd";
// ex:
/* <DownloadForm
        url="http://localhost:4000/uploads/file-1697161233298.pdf"
        text="form"
      /> */

// need mdify download function
// download two templates
// dowload visas

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
    <div>
      <Button
        onClick={() => downloadFileAtUrl(url)}
        style={{ marginRight: "5%" }}
      >
        Download{` ${text}`}
      </Button>
    </div>
  );
};

export default DownloadForm;

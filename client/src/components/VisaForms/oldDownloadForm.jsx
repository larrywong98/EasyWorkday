import React from "react";

const form_url = "http://localhost:4000/uploads/file-1697161233298.pdf";
const template_url = "http://localhost:4000/uploads/file-1697162266407.pdf";

const DownloadForm = () => {
  const downloadFileAtUrl = (url) => {
    const filename = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", filename);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  return (
    <div>
      <button
        onClick={() => downloadFileAtUrl(form_url)}
        style={{ marginRight: "5%" }}
      >
        Download form
      </button>
      <button onClick={() => downloadFileAtUrl(template_url)}>
        Download template
      </button>
    </div>
  );
};

export default DownloadForm;

import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  function handleUpload() {
    if (!file) {
      setMsg("N0 file selected");
      return;
    }
    const fd = new FormData();
    fd.append("file", file);

    setMsg("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });
    axios
      .post("http://127.0.0.1:4000/api/upload", fd, {
        onUploadProgress: (ProgressEvent) => {
          setProgress((prevState) => ({
            ...prevState,
            pc: ProgressEvent.progress * 100,
          }));
        },
        headers: {
          "Custom-header": "value",
        },
      })
      .then((res) => {
        setMsg("Upload Succesful");
        console.log(res.data);
        setFileInfo(res.data.fileInfo);
      })
      .catch((err) => {
        setMsg("Upload Failed");
        console.error(err);
      });
  }
  return (
    <div>
      <p>Upload File:</p>
      <input onChange={(e) => setFile(e.target.files[0])} type="file" />
      <button onClick={handleUpload}>Upload</button>
      <div>
        {progress.started && (
          <progress max="100" value={progress.pc}></progress>
        )}
        {msg && <span>{msg}</span>}
        {fileInfo && (
          <div>
            <h3>File Information:</h3>
            <ul>
              <li>Filename: {fileInfo.filename}</li>
              <li>Original Name: {fileInfo.originalname}</li>
              <li>Size: {fileInfo.size} bytes</li>
              <li>MIME Type: {fileInfo.mimetype}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;

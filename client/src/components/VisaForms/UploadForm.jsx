import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { setPendingStatus } from "../../reducer/statusSlice";
import { statusTrigger } from "../../reducer/statusSlice";

const UploadForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null); // Added to store the PDF URL

  function handleUpload() {
    if (!file) {
      setMsg("No file selected");
      return;
    }
    const fd = new FormData();
    fd.append("file", file);

    setMsg("Uploading...");
    setProgress((prevState) => ({
      ...prevState,
      started: true,
    }));
    axios
      .post("http://127.0.0.1:4000/api/upload", fd, {
        onUploadProgress: (ProgressEvent) => {
          setProgress((prevState) => ({
            ...prevState,
            pc: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          }));
        },
        headers: {
          "Custom-header": "value",
        },
      })
      .then((res) => {
        setMsg("Upload Successful");
        console.log(res.data);
        setFileInfo(res.data.fileInfo);
        setPdfUrl(res.data.pdfUrl); // Set the PDF URL received from the server
        // dispatch(setPendingStatus({ status: "pending" }));
        dispatch(statusTrigger({ status: "pending" }));
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
        {pdfUrl && (
          <div>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Open PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;

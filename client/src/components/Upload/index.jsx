import { useState } from "react";

const Upload = () => {
  const [fileName, setFileName] = useState("");

  const sendToBackend = async (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("ext", "pdf");
    const response = await fetch("http://144.202.42.97:8001/", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setFileName(data.name);
  };
  return (
    <>
      <input type="file" onChange={(e) => sendToBackend(e)} />
      <p>{`http://144.202.42.97:8001/resources/${fileName}.pdf`}</p>
    </>
  );
};
export default Upload;

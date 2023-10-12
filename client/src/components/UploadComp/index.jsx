import { Upload } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePic } from "../../reducer/userSlice";
const UploadComp = (props) => {
  const [loading, setLoading] = useState(false);
  //   const [previewUrl, setPreviewUrl] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
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

  // const getBase64 = (img, callback) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      dispatch(
        updateProfilePic({
          profilePic: {
            uid: "1",
            name: "ProfileUrl.png",
            status: "done",
            url: info.file.response.fileUrl,
          },
        })
      );

      console.log(user.profilePic);
    }
  };
  // const request = async () => {
  //   // const response = await fetch('http://127.0.0.1:4000/api/upload')
  // };
  return (
    <>
      <Upload
        name="file"
        action="http://127.0.0.1:4000/api/upload"
        showUploadList={true}
        maxCount={1}
        listType={props.listType}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        // defaultFileList={user.profilePic.uid === "" ? [] : [user.profilePic]}
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

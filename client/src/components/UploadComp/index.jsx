import { Upload } from "antd";
import { useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeFile, updateFile } from "../../reducer/userSlice";
import { createSelector } from "@reduxjs/toolkit";
//<UploadComp name='OptReceipt' />
//<UploadComp name='OptEad' />
//<UploadComp name='I983' />
//<UploadComp name='I20' />
// After Upload
// <a href={user.visa.optReceipt.url} />
// user.visa.optEad
// user.visa.i983
// user.visa.i20

const UploadComp = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  // Component not updating when change nested objects
  const fileHandler = createSelector([(state) => state], (user) => {
    switch (props.name) {
      case "ProfilePicture":
        if (!user.info.profilePicture) return [];
        else if (Object.keys(user.info.profilePicture).length === 0) return [];
        else return [user.info.profilePicture];

      case "DriverLicense":
        if (!user.info.driverLicense) return [];
        else if (Object.keys(user.info.driverLicense).length === 0) return [];
        else return [user.info.driverLicense];

      case "WorkAuthorization":
        if (!user.info.workAuthorization) return [];
        else if (Object.keys(user.info.workAuthorization).length === 0)
          return [];
        else return [user.info.workAuthorization];

      case "OptReceipt":
        if (!user.visa.optReceipt) return [];
        else if (Object.keys(user.visa.optReceipt).length === 0) return [];
        else return [user.visa.optReceipt];

      case "OptEad":
        if (!user.visa.optEad) return [];
        else if (Object.keys(user.visa.optEad).length === 0) return [];
        else return [user.visa.optEad];

      case "I983":
        if (!user.visa.i983) return [];
        else if (Object.keys(user.visa.i983).length === 0) return [];
        else return [user.visa.i983];

      case "I20":
        if (!user.visa.i20) return [];
        else if (Object.keys(user.visa.i20).length === 0) return [];
        else return [user.visa.i20];

      default:
        return [];
    }
  });
  const fileList = fileHandler(user);

  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.log("Image must smaller than 2MB!");
    }
    return isLt2M;
  };
  const handleRemove = (info) => {
    dispatch(removeFile({ fileName: props.name }));
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      dispatch(
        updateFile({
          fileInfo: {
            name: props.name,
            status: "done",
            url: info.file.response.fileUrl,
          },
        })
      );
    }
  };
  // const fileList = useMemo(() => {
  //   switch (props.name) {
  //     case "ProfilePicture":
  //       if (!user.info.profilePicture) return [];
  //       else if (Object.keys(user.info.profilePicture).length === 0) return [];
  //       else return [user.info.profilePicture];

  //     case "DriverLicense":
  //       if (!user.info.driverLicense) return [];
  //       else if (Object.keys(user.info.driverLicense).length === 0) return [];
  //       else return [user.info.driverLicense];

  //     case "WorkAuthorization":
  //       if (!user.info.workAuthorization) return [];
  //       else if (Object.keys(user.info.workAuthorization).length === 0)
  //         return [];
  //       else return [user.info.workAuthorization];

  //     case "OptReceipt":
  //       if (!user.visa.optReceipt) return [];
  //       else if (Object.keys(user.visa.optReceipt).length === 0) return [];
  //       else return [user.visa.optReceipt];

  //     case "OptEad":
  //       if (!user.visa.optEad) return [];
  //       else if (Object.keys(user.visa.optEad).length === 0) return [];
  //       else return [user.visa.optEad];

  //     case "I983":
  //       if (!user.visa.i983) return [];
  //       else if (Object.keys(user.visa.i983).length === 0) return [];
  //       else return [user.visa.i983];

  //     case "I20":
  //       if (!user.visa.i20) return [];
  //       else if (Object.keys(user.visa.i20).length === 0) return [];
  //       else return [user.visa.i20];

  //     default:
  //       return [];
  //   }
  // }, [user, props.name]);

  return (
    <>
      <Upload
        name="file"
        action="http://127.0.0.1:4000/api/upload"
        showUploadList={true}
        maxCount={1}
        listType={props.listType || "picture-card"}
        onChange={handleChange}
        onRemove={handleRemove}
        beforeUpload={beforeUpload}
        defaultFileList={fileList}
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

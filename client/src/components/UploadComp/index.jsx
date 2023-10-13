import { Button, Space, Upload } from "antd";
// import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeFile, updateFile } from "../../reducer/userSlice";
import { fileName } from "../../reducer/global";

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
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  // const fileList = [user.profilePicture];
  // const [showUploadList, setShowUploadList] = useState(true);
  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.log("Image must smaller than 2MB!");
    }
    return isLt2M;
  };
  const handleRemove = (info) => {
    dispatch(removeFile({ name: props.name }));
  };
  const handleChange = (info) => {
    // if (info.file.status === "uploading") {
    //   setLoading(true);
    // }
    if (info.file.status === "done") {
      // setShowUploadList(true);
      dispatch(
        updateFile({
          name: props.name,
          fileInfo: {
            name: props.name,
            status: "done",
            url: info.file.response.fileUrl,
          },
        })
      );

      return;
    }
  };

  return (
    <>
      {user.files[fileName[props.name]].length === 0 ? (
        <Upload
          name="file"
          action="http://144.202.42.97:8001/api/upload"
          maxCount={1}
          listType={props.listType || "picture-card"}
          onChange={handleChange}
          onRemove={handleRemove}
          beforeUpload={beforeUpload}
          // showUploadList={showUploadList}

          // antd bug not fixed infinite loading if filelist get a value
          // defaultFileList={}
          // fileList = {}
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
      ) : (
        // Upload Preview
        <Space size="middle">
          {console.log(user.files[fileName[props.name]][0].url)}
          <a href={user.files[fileName[props.name]][0].url}>{props.name}</a>
          <Button onClick={() => dispatch(removeFile({ name: props.name }))}>
            Remove
          </Button>
        </Space>
      )}
    </>
  );
};
export default UploadComp;

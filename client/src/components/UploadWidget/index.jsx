import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useRef } from "react";

// const Cloud = () => {
// cld.v2.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );
// return <></>;
// };

const UploadWidget = () => {
  // const cld = new Cloudinary({ cloud: { cloudName: "dbpw07noy" } });
  // cld.v2.uploader.upload(image).then((result) => console.log(result));
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dbpw07noy",
        uploadPreset: "hnebbkbj",
      },
      (error, result) => {
        console.log(result);
      }
    );
  }, []);
  return (
    <button
      style={{ width: "200px", height: "50px" }}
      onClick={() => widgetRef.current.open()}
    >
      Upload
    </button>
  );
};

export default UploadWidget;

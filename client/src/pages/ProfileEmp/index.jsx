import { Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";

const ProfileEmp = () => {
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
      ></Breadcrumb>
      <div
        className="site-layout-content"
        style={{
          height: "800px",
        }}
      >
        profile emp
      </div>
    </>
  );
};
export default ProfileEmp;

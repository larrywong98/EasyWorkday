import { Breadcrumb } from "antd";

const ProfileHr = () => {
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
        profile hr
      </div>
    </>
  );
};
export default ProfileHr;

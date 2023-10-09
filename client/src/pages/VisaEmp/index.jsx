import { Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";

const VisaEmp = () => {
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
        visa emp
      </div>
    </>
  );
};
export default VisaEmp;

import { Breadcrumb } from "antd";
// import { Content } from "antd/es/layout/layout";

import { useSelector } from "react-redux"
import OPT from "../../components/Visas/OPT"
import EAD from "../../components/Visas/EAD"
import I20 from "../../components/Visas/I20"
import I983 from "../../components/Visas/I983"

import { Collapse } from 'antd';
const { Panel } = Collapse;

const VisaEmp = () => {
  const visas = ["OPT", "EAD", "I-983", "I-20"];
  const VisaComponents = [<OPT />, <EAD />, <I20 />, <I983 />];
  const status = useSelector((state) => state.statusReducer.statusArray);
  const panels = visas.map((visa, idx) => (<Panel header={visa} key={idx}>
    <p>{visa} status: {status[idx]}</p>
    {VisaComponents[idx]}
  </Panel>));
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
        <Collapse>{panels}</Collapse>

      </div >
    </>
  );
};
export default VisaEmp;

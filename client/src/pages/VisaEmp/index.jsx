import { Breadcrumb } from "antd";
// import { Content } from "antd/es/layout/layout";

import { useSelector } from "react-redux";
import OPT from "../../components/VisasEmp/OPT";
import EAD from "../../components/VisasEmp/EAD";
import I20 from "../../components/VisasEmp/I20";
import I983 from "../../components/VisasEmp/I983";

import { Collapse } from "antd";
const { Panel } = Collapse;

const VisaEmp = () => {
  const status = useSelector((state) => state.statusReducer.arr);
  const approve = (st) => st === "approved";
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
        <Collapse accordion>
          <Panel header="OPT" key="OPT">
            <p>OPT status: {status[0]}</p>
            <OPT status={status[0]} />
          </Panel>

          {approve(status[0]) && (
            <Panel header="EAD" key="EAD">
              <p>EAD status: {status[1]}</p>
              <EAD status={status[1]} />
            </Panel>
          )}

          {approve(status[1]) && (
            <Panel header="I-983" key="I-983">
              <p>I-983 status: {status[2]}</p>
              <I983 status={status[2]} />
            </Panel>
          )}

          {approve(status[2]) && (
            <Panel header="I-20" key="I-20">
              <p>I-20 status: {status[3]}</p>
              <I20 status={status[3]} />
            </Panel>
          )}
        </Collapse>
      </div>
    </>
  );
};
export default VisaEmp;

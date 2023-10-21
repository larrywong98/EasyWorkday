import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import OPT from "../../components/VisasEmp/OPT";
import EAD from "../../components/VisasEmp/EAD";
import I20 from "../../components/VisasEmp/I20";
import I983 from "../../components/VisasEmp/I983";
import { statusProperties } from "../../reducer/global";

import { Collapse } from "antd";
const { Panel } = Collapse;

const VisaEmp = () => {
  const status = useSelector((state) => state.userReducer.visa);
  const statusArray = [
    status[statusProperties[0]],
    status[statusProperties[1]],
    status[statusProperties[2]],
    status[statusProperties[3]],
  ];
  console.log(status);
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
        <Collapse
          accordion
          style={{
            width: "80em",
          }}
        >
          <Panel header="OPT" key="OPT">
            <p>OPT status: {statusArray[0]}</p>
            <OPT status={statusArray[0]} />
          </Panel>

          {approve(statusArray[0]) && (
            <Panel header="EAD" key="EAD">
              <p>EAD status: {statusArray[1]}</p>
              <EAD status={statusArray[1]} />
            </Panel>
          )}

          {approve(statusArray[1]) && (
            <Panel header="I-983" key="I-983">
              <p>I-983 status: {statusArray[2]}</p>
              <I983 status={statusArray[2]} />
            </Panel>
          )}

          {approve(statusArray[2]) && (
            <Panel header="I-20" key="I-20">
              <p>I-20 status: {statusArray[3]}</p>
              <I20 status={statusArray[3]} />
            </Panel>
          )}
        </Collapse>
      </div>
    </>
  );
};
export default VisaEmp;

import { Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  statusProperties,
  temps,
  nextStep,
  feedbackKey,
} from "../../reducer/global";
import UploadForm from "../../components/VisaForms/UploadForm";
import { Collapse } from "antd";
import { useEffect } from "react";
import DownloadForm from "../../components/VisaForms/DownloadForm";
import { loadUserInfo } from "../../services/loadUserInfo";
import { loadUser } from "../../reducer/userSlice";
const { Title } = Typography;
const { Panel } = Collapse;

const VisaEmp = () => {
  const status = useSelector((state) => state.userReducer.visa);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const statusArray = [
    status[statusProperties[0]],
    status[statusProperties[1]],
    status[statusProperties[2]],
    status[statusProperties[3]],
  ];

  //load user data userInfo.userId
  useEffect(() => {
    (async () => {
      const response = await loadUserInfo(user.userId);
      dispatch(loadUser({ user: response }));
    })();
  }, []);

  const receipt = (index) => {
    if (statusArray[index] === "pending") {
      return <p>{nextStep[index][0]}</p>;
    } else if (statusArray[index] === "approved") {
      if (statusArray[index + 1] === "approved") {
        return <></>;
      }
      return <p>{nextStep[index][1]}</p>;
    } else if (statusArray[index] === "rejected") {
      return <p>{user.visa[feedbackKey[index]]}</p>;
    }
  };
  const collapseChildren = [
    { header: "EAD", key: "EAD", uploadName: "Ead" },
    { header: "I-983", key: "I-983", uploadName: "I983" },
    { header: "I-20", key: "I-20", uploadName: "I20" },
  ];

  const approve = (st) => st === "approved";

  return (
    <>
      <div
        className="site-layout-content"
        style={{
          margin: "40px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>Visa Management</Title>
        <Collapse
          accordion
          style={{
            width: "800px",
          }}
        >
          <Panel header="OPT" key="OPT">
            <p>OPT status: {statusArray[0]}</p>
            <Space wrap>
              <DownloadForm url={temps[0]} text="form" />
              <DownloadForm url={temps[1]} text="template" />
            </Space>

            <div>
              {receipt(0)}
              {!approve(statusArray[0]) && <UploadForm name="Opt" />}
            </div>
          </Panel>

          {collapseChildren.map((item, index) => (
            <>
              {approve(statusArray[index]) && (
                <Panel header={item.header} key={item.key}>
                  <p>
                    {item.header} status: {statusArray[index + 1]}
                  </p>
                  <div>
                    {receipt(index + 1)}
                    {!approve(statusArray[index + 1]) && (
                      <UploadForm name={item.uploadName} />
                    )}
                  </div>
                </Panel>
              )}
            </>
          ))}
        </Collapse>
      </div>
    </>
  );
};
export default VisaEmp;

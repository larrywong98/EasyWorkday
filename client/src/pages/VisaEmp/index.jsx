import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "antd";
import { useEffect } from "react";
import { loadUserInfo } from "../../services/loadUserInfo";
import { loadUser } from "../../reducer/userSlice";
import { statusProperties } from "../../reducer/global";
import Visa from "../../components/VisasEmp/Visa";
import { approve } from "../../utils/approve";
import { Alert, Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Panel } = Collapse;

const VisaEmp = () => {
  const user = useSelector((state) => state.userReducer);
  const visaInfo = useSelector((state) => state.userReducer.visa);
  const dispatch = useDispatch();

  //load user data userInfo.userId
  useEffect(() => {
    (async () => {
      const response = await loadUserInfo(user.userId);
      dispatch(loadUser({ user: response }));
    })();
  }, []);

  const collapseChildren = [
    { visa: "OPT", uploadName: "Opt" },
    { visa: "EAD", uploadName: "Ead" },
    { visa: "I-983", uploadName: "I983" },
    { visa: "I-20", uploadName: "I20" },
  ];

  const isOPT = (name) => name === "Opt";

  const findOuterStatus = (name, index) => {
    return isOPT(name)
      ? user.applicationStatus
      : visaInfo[statusProperties[index - 1]];
  };

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
        {user.info.visaTitle === "F1(CPT/OPT)" ? (
          <>
            <Title>Visa Management</Title>
            <Collapse
              accordion
              style={{
                width: "800px",
              }}
            >
              {collapseChildren.map(
                (item, index) =>
                  approve(findOuterStatus(item.uploadName, index)) && (
                    <Panel header={item.visa} key={index}>
                      <Visa name={item.uploadName} index={index} />
                    </Panel>
                  )
              )}
            </Collapse>
          </>
        ) : (
          <Stack direction="column" sx={{ alignItems: "center", gap: 35 }}>
            <Alert
              severity="success"
              sx={{ width: 400, justifyContent: "center" }}
            >
              No visa document required
            </Alert>
            <Button
              component={Link}
              to="/"
              variant="contained"
              sx={{ width: "150px", height: "150px", borderRadius: "50%" }}
            >
              Go Home
            </Button>
          </Stack>
        )}
      </div>
    </>
  );
};
export default VisaEmp;

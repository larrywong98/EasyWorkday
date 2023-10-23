import React from "react";
import { Descriptions } from "antd";
import { useEffect, useState } from "react";
import { List } from "antd";
import loadAllUser from "../../services/loadAllUser";
import { statusProperties, visas, nextSteps } from "../../reducer/global";
// import NextSteps from "../../components/VisaHr/NextSteps";
import Action from "../../components/VisaHr/Action";

const InProgress = () => {
  const [employees, setEmp] = useState([]);
  // const [nextstep, setNextStep] = useState("");
  // const [index, setIndex] = useState(0);
  // const [latestStatus, setLatestStatus] = useState("");
  useEffect(() => {
    (async () => {
      const response = await loadAllUser();
      setEmp(response);
    })();
  }, []);

  const findLatestVisa = (visaInfo) => {
    // setIndex(visaInfo.cur);
    // setLatestStatus(visaInfo[statusProperties[index]]);
    let index = visaInfo.cur;
    let latestStatus = visaInfo[statusProperties[index]];
    if (index > 0 && latestStatus === "") {
      latestStatus = visaInfo[statusProperties[index - 1]];
      index = index - 1;
    }
    console.log(`inprogress: ${index} ${latestStatus}`);
    return { curStatus: latestStatus, curIdx: index };
  };

  const generateNextStep = (visaInfo) => {
    let nextstep = "";
    let index = visaInfo.cur;
    let latestStatus = visaInfo[statusProperties[index]];
    if (index > 0 && latestStatus === "") {
      latestStatus = visaInfo[statusProperties[index - 1]];
      index = index - 1;
    }
    if (latestStatus === "pending") {
      nextstep = nextSteps[visas[index]][0];
      // setNextStep(nextSteps[visas[index]][0]);
    } else if (latestStatus === "approved") {
      nextstep = nextSteps[visas[index]][1];
      // setNextStep(nextSteps[visas[index]][1]);
    } else if (latestStatus === "rejected") {
      nextstep = nextSteps[visas[index]][0];
      // setNextStep(nextSteps[visas[index]][0]);
    }
    // else if (curIdx > 0) {
    //   setNextStep(nextSteps[visas[curIdx - 1]][1]);
    // }
    return nextstep;
  };

  const findLatestVisaFile = (visaInfo, fileInfo) => {
    const index = visaInfo.cur;
    let visaUrl = fileInfo[index];
    let latestStatus = visaInfo[statusProperties[index]];
    if (index > 0 && latestStatus === "") {
      visaUrl = fileInfo[index - 1];
    }

    return { visaUrl: visaUrl };
  };

  const daysRemain = (visaEndDate) => {
    const date1 = new Date();
    const date2 = new Date(visaEndDate);

    // To calculate the time difference of two dates
    const Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days.toFixed(0);
  };

  return (
    <div>
      <h1>In Progress:</h1>
      <List
        header={<div>Employee</div>}
        bordered
        dataSource={employees}
        renderItem={(employee) => (
          <>
            {/* {console.log(employee.info.firstName)} */}
            <List.Item>
              <Descriptions title="Employee Info">
                <Descriptions.Item label="Name">
                  {employee.info.firstName} {employee.info.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Title">
                  {employee.info.visaTitle}
                </Descriptions.Item>
                <Descriptions.Item label="Start and end date">
                  {employee.info.visaDate[0]} {employee.info.visaDate[1]}
                </Descriptions.Item>
                <Descriptions.Item label="Number of Days Remaining">
                  {daysRemain(employee.info.visaDate[1])}
                </Descriptions.Item>
                <Descriptions.Item label="Next Steps" span={2}>
                  {generateNextStep(employee.visa)}
                </Descriptions.Item>
                <Descriptions.Item label="Actions">
                  <Action
                    employeeId={employee.userId}
                    {...findLatestVisa(employee.visa)}
                    {...findLatestVisaFile(employee.visa, employee.files)}
                    userEmail={employee.info.email}
                    userName={employee.info.firstName}
                    nextstep={generateNextStep(employee.visa)}
                  />
                </Descriptions.Item>
              </Descriptions>
            </List.Item>
          </>
        )}
      />
    </div>
  );
};

export default InProgress;

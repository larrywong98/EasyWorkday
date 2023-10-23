import React from "react";
import { Descriptions } from "antd";
import { useEffect, useState } from "react";
import { List } from "antd";
import loadAllUser from "../../services/loadAllUser";
import { statusProperties } from "../../reducer/global";
import NextSteps from "../../components/VisaHr/NextSteps";
import Action from "../../components/VisaHr/Action";

const InProgress = () => {
  const [employees, setEmp] = useState([]);
  // const [index, setIndex] = useState(0);
  // const [latestStatus, setLatestStatus] = useState("");
  useEffect(() => {
    (async () => {
      const response = await loadAllUser();
      setEmp(response);
    })();
  }, []);

  const findLatestVisa = (visaInfo) => {
    const index = visaInfo.cur;
    const latestStatus = visaInfo[statusProperties[index]];
    // console.log(`inprogress: ${index} ${latestStatus}`);
    return { status: latestStatus, idx: index };
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
                <NextSteps {...findLatestVisa(employee.visa)} />
              </Descriptions.Item>
              <Descriptions.Item label="Actions">
                <Action
                  employeeId={employee.userId}
                  curIdx={employee.visa.cur}
                />
              </Descriptions.Item>
            </Descriptions>
          </List.Item>
        )}
      />
    </div>
  );
};

export default InProgress;

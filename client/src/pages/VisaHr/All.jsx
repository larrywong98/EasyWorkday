import React from "react";
import { Descriptions } from "antd";
import { useEffect, useState } from "react";
import { List } from "antd";
import loadAllUser from "../../services/loadAllUser";
import { statusProperties, visas, nextSteps } from "../../reducer/global";
import Action from "../../components/VisaHr/Action";
import Notification from "../../components/VisaHr/Notification";
import { useSelector } from "react-redux";
import { clearHrSlice, initialHrSlice } from "../../reducer/hrSlice";
import { useDispatch } from "react-redux";

const All = () => {
  const [employees, setEmp] = useState([]);
  const change = useSelector((state) => state.hrReducer.response);
  const curStatus = useSelector((state) => state.hrReducer.empStatus);
  const time = useSelector((state) => state.hrReducer.time);
  const nextStep = useSelector((state) => state.hrReducer.nextStep);
  const dispatch = useDispatch();

  const findLatestStatus = (visaInfo, fileInfo) => {
    let index = visaInfo.cur;
    let latestStatus = visaInfo[statusProperties[index]];
    let latestvisaUrl = fileInfo[index].url;
    if (index > 0 && latestStatus === "") {
      latestStatus = visaInfo[statusProperties[index - 1]];
      latestvisaUrl = fileInfo[index - 1];
      index = index - 1;
    }
    console.log(`inprogress: ${index} ${latestStatus} ${latestvisaUrl}`);
    const message = generateNextStep(latestStatus, index);
    // status, index, url
    dispatch(
      initialHrSlice({
        status: latestStatus,
        url: latestvisaUrl,
        index: index,
        message: message,
      })
    );
  };

  useEffect(() => {
    (async () => {
      const response = await loadAllUser();
      setEmp(response);
      dispatch(clearHrSlice());
      response.forEach((employee) => {
        findLatestStatus(employee.visa, employee.files);
      });
    })();
  }, []);

  const approve = (st) => st === "approved";

  const generateNextStep = (latestStatus, index) => {
    let nextstep = "";
    if (latestStatus === "pending") {
      nextstep = nextSteps[visas[index]][0];
    } else if (latestStatus === "approved") {
      nextstep = nextSteps[visas[index]][1];
    } else if (latestStatus === "rejected") {
      nextstep = nextSteps[visas[index]][0];
    }
    return nextstep;
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
        renderItem={(employee, index) => (
          <>
            <List.Item key={index}>
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
                  {nextStep[index]}
                </Descriptions.Item>
                <Descriptions.Item label="DownLoad Files"></Descriptions.Item>
              </Descriptions>
            </List.Item>
          </>
        )}
      />
    </div>
  );
};

export default All;

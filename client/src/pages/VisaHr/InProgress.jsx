import React from "react";
import { Descriptions } from "antd";
import { useEffect, useState } from "react";
import { List } from "antd";
import loadInProgressVisaUser from "../../services/loadInProgressVisaUser";
import { statusProperties, visas, nextSteps } from "../../reducer/global";
import Action from "../../components/VisaHr/Action";
import Notification from "../../components/VisaHr/Notification";
import { useSelector } from "react-redux";
import { initialHrSlice, clearHrSlice } from "../../reducer/hrSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { approve } from "../../utils/approve";
import { Pagination } from "antd";

const InProgress = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // you can adjust this value
  const [employees, setEmp] = useState([]);
  const change = useSelector((state) => state.hrReducer.response);
  const curStatus = useSelector((state) => state.hrReducer.empStatus);
  const time = useSelector((state) => state.hrReducer.time);
  const nextStep = useSelector((state) => state.hrReducer.nextStep);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const findLatestStatus = (visaInfo, fileInfo) => {
    let index = visaInfo.cur;
    let urlindex = Math.min(3 + index, 6);
    // console.log(urlindex);
    // console.log(fileInfo[urlindex][0].url);
    let latestStatus = visaInfo[statusProperties[index]];

    let latestvisaUrl = fileInfo[urlindex][0]?.url || "";
    if (index > 0 && latestStatus === "initial") {
      latestStatus = visaInfo[statusProperties[index - 1]];
      latestvisaUrl = fileInfo[urlindex - 1][0]?.url || "";
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
      const response = await loadInProgressVisaUser();
      if (response === "error") {
        navigate("/error");
        return;
      }
      // console.log(response);
      setEmp(response);
      dispatch(clearHrSlice());
      response.forEach((employee) => {
        findLatestStatus(employee.visa, employee.files);
      });
    })();
  }, []);

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

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ width: "80%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>In progress:</h1>
        <Link to="/hr/visa">
          <LeftOutlined />
        </Link>
      </div>
      <List
        header={<div>Employee</div>}
        bordered
        // dataSource={employees}
        dataSource={employees.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )}
        renderItem={(employee, index) => (
          <>
            <List.Item key={index}>
              <Descriptions title="Employee Info">
                <Descriptions.Item label="Name">
                  <div
                    style={{
                      height: "30px",
                      width: "200px",
                    }}
                  >
                    {employee.info.firstName} {employee.info.lastName}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Title">
                  {employee.info.visaTitle}
                </Descriptions.Item>
                <Descriptions.Item label="Start and end date">
                  <div
                    style={{
                      height: "50px",
                      width: "100px",
                    }}
                  >
                    {employee.info.visaDate[0]} {employee.info.visaDate[1]}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Number of Days Remaining">
                  <div
                    style={{
                      height: "30px",
                      width: "50px",
                    }}
                  >
                    {daysRemain(employee.info.visaDate[1])}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Next Steps" span={2}>
                  {nextStep[index]}
                </Descriptions.Item>
                <Descriptions.Item label="Actions">
                  {!approve(curStatus[index]) && !change[index] && (
                    <Action index={index} employeeId={employee.userId} />
                  )}
                  {approve(curStatus[index]) && !change[index] && (
                    <Notification
                      index={index}
                      emailAddress={employee.info.email}
                      userName={employee.info.firstName}
                    />
                  )}
                  {change[index] && <div>Already take actions</div>}
                </Descriptions.Item>
                <Descriptions.Item label="Last Response">
                  {time[index] && <div>Take Actions on {time[index]}</div>}
                </Descriptions.Item>
              </Descriptions>
            </List.Item>
          </>
        )}
      />
      <Pagination
        current={currentPage}
        total={employees.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default InProgress;

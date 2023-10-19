import React from "react";
import { Descriptions } from "antd";
import { useEffect, useState } from "react";
import { List } from "antd";
import sendRequest from "../../services/sendRequest";
import NextSteps from "../../components/VisaHr/NextSteps";

const InProgress = () => {
  const [employees, setEmp] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await sendRequest({
        url: "http://127.0.0.1:4000/api/emp/all",
        method: "GET",
      });
      setEmp(response);
    })();
  }, []);

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
                empty
              </Descriptions.Item>
              <Descriptions.Item label="Next Steps">
                <NextSteps />
              </Descriptions.Item>
              <Descriptions.Item label="Actions">empty</Descriptions.Item>
            </Descriptions>
          </List.Item>
        )}
      />
    </div>
  );
};

export default InProgress;

import React from "react";
import { Descriptions } from "antd";

const InProgress = () => {
  const employees = [
    {
      info: {
        firstName: "Yingshan",
        lastName: "Qu",
        visaTitle: "F1(CPT/OPT)",
        visaDate: ["2023-03-03", "2024-03-03"],
      },
    },
    {
      info: {
        firstName: "Xiaoyun",
        lastName: "Wang",
        visaTitle: "F1(CPT/OPT)",
        visaDate: ["2023-04-04", "2024-04-04"],
      },
    },
    {
      info: {
        firstName: "Xiangyu",
        lastName: "Zeng",
        visaTitle: "F1(CPT/OPT)",
        visaDate: ["2023-05-05", "2024-05-05"],
      },
    },
  ];
  const progress = employees.map((employee, idx) => (
    <div
      key={idx}
      style={{ border: "1px solid", borderRadius: "25px", padding: "2%" }}
    >
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
        <Descriptions.Item label="Next Steps">empty</Descriptions.Item>
        <Descriptions.Item label="Actions">empty</Descriptions.Item>
      </Descriptions>
    </div>
  ));
  return (
    <div>
      <h1>In Progress:</h1>
      {progress}
    </div>
  );
};

export default InProgress;

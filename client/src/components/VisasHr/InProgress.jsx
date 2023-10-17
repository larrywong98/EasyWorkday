import React from "react";

const InProgress = ({}) => {
  const employees = [
    {
      info: {
        firstName: "Yingshan",
        lastName: "Qu",
        visaTitle: "F1(CPT/OPT)",
        visaDate: ["2023-07-18", "2024-07-08"],
      },
    },
  ];
  return (
    <div>
      {employees.forEach((employee) => {
        <p>
          Name: <br />
          {employee.info.firstName} {employee.info.lastName}
        </p>;
        <p>
          Work Authorization: <br />
          Title: {employee.info.visaTitle}
          <br />
          Start and end date:
          {employee.info.visaDate.forEach((el) => {
            el;
          })}
          <br />
          Number of Days Remaining{}
        </p>;
      })}
    </div>
  );
};

export default InProgress;

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "antd";
import { changeResponse, updateTime } from "../../reducer/hrSlice";
import { useDispatch, useSelector } from "react-redux";

const Notification = ({ index, userName, emailAddress }) => {
  const [result, setResult] = useState("");
  const message = useSelector((state) => state.hrReducer.nextStep[index]);
  const dispatch = useDispatch();

  const sendNotification = () => {
    emailjs
      .send(
        "service_dnk2nug",
        "template_xubas0b",
        {
          to_email: emailAddress,
          to_name: userName,
          message: message,
          from_name: "Yingshan",
        },
        "F6ljvQUYfyNjd-1Qt"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setResult("Email sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error);
          setResult("Failed to send email!");
        }
      );
    dispatch(changeResponse(index));
    dispatch(updateTime(index));
  };

  return (
    <>
      <div>
        <Button onClick={sendNotification}>Send Notification</Button>
        {result && <p>{result}</p>}
      </div>
    </>
  );
};

export default Notification;

import React, { useEffect } from "react";
import { nextSteps, visas } from "../../reducer/global";
import { useState } from "react";

const NextSteps = ({ curStatus, curIdx }) => {
  useEffect(() => {
    generateNextStep();
  }, []);
  const [nextStep, setNextStep] = useState("");
  const generateNextStep = () => {
    if (curStatus === "pending") {
      setNextStep(nextSteps[visas[curIdx]][0]);
    } else if (curStatus === "approved") {
      setNextStep(nextSteps[visas[curIdx]][1]);
    } else if (curStatus === "rejected") {
      setNextStep(nextSteps[visas[curIdx]][0]);
    }
  };

  return <div>{nextStep}</div>;
};

export default NextSteps;

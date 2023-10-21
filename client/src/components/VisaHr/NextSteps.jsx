import React, { useEffect } from "react";
import { nextSteps, visas } from "../../reducer/global";
import { useState } from "react";

const NextSteps = (props) => {
  const { status, idx } = props;
  console.log(nextSteps[visas[idx]][0]);
  console.log(nextSteps[visas[idx]][1]);
  useEffect(() => {
    generateNextStep();
  }, []);
  const [nextStep, setNextStep] = useState("");
  const generateNextStep = () => {
    if (status === "pending") {
      setNextStep(nextSteps[visas[idx]][0]);
    } else if (status === "approved") {
      setNextStep(nextSteps[visas[idx]][1]);
    }
  };

  return <div>{nextStep}</div>;
};

export default NextSteps;

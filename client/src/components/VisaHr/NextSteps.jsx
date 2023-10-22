import React, { useEffect } from "react";
import { nextSteps, visas } from "../../reducer/global";
import { useState } from "react";

const NextSteps = ({ status, idx }) => {
  // console.log(`NeaxtSteps: ${idx} ${status}`);
  useEffect(() => {
    generateNextStep();
  }, [idx]);
  const [nextStep, setNextStep] = useState("");
  const generateNextStep = () => {
    if (status === "pending") {
      setNextStep(nextSteps[visas[idx]][0]);
    } else if (status === "approved") {
      setNextStep(nextSteps[visas[idx]][1]);
    } else if (status === "rejected" || status === "") {
      setNextStep(nextSteps[visas[idx]][0]);
    } else if (idx > 0) {
      setNextStep(nextSteps[visas[idx - 1]][1]);
    }
  };

  return <div>{nextStep}</div>;
};

export default NextSteps;

import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../animations/87041-order-processing-icon-animation.json";

const RefundProcessing = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} width={200} height={200} />;
};

export default RefundProcessing;

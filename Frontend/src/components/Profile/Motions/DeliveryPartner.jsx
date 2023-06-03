import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../animations/113226-delivery-man-with-truck-lottie-animation.json";

const DeliveryPartner = () => {
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

export default DeliveryPartner;

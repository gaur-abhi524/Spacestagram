import React from "react";
import Lottie from "lottie-react";
import astronautAnimation from "./89033-star-in-hand-baby-astronaut.json";

export default function LottieAnimation() {
  const style = {
    height: 300,
  };

  return (
    <div>
      <Lottie animationData={astronautAnimation} style={style} loop={true} />
    </div>
  );
}

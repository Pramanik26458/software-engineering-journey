import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AnimateOnX = ({ children }) => {
  const container = useRef();

  useGSAP(() => {
    gsap.to(container.current, {
      x: 700,
      duration: 1,
      delay: 0.5,
    });
  });

  return <div ref={container}>{children}</div>;
};

export default AnimateOnX;
import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";
import animationData from "./animation.json";

const DataNotFound = () => {
  const animRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      anim.destroy(); // Animation ko destroy karne ke liye
    };
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  return (
    <tr className="DataNotFoundSvg">
      <td colSpan={7}>
        <div ref={animRef} className="flex justify-center "></div>
      </td>
    </tr>
  );
};

export default DataNotFound;

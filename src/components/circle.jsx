import React from "react";
import "../styles/circle.scss";

const circle = () => {
  return (
    <div className="container">
      <svg
        class="loader"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 340 340"
      >
        <circle className="circle1" cx="170" cy="170" r="160" stroke="white" />
        <circle
          className="circle1"
          cx="170"
          cy="170"
          r="135"
          stroke="#55e6c7"
        />
        <circle
          className="circle1"
          cx="170"
          cy="170"
          r="110"
          stroke="#fcff7d"
        />
        {/* <circle className="circle1" cx="170" cy="170" r="85" stroke="white" /> */}
      </svg>
    </div>
  );
};

export default circle;

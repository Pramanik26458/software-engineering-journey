import React from "react";

const Washroom = (props) => {
  const color = props.user === "Male" ? "blue" : "rgba(240, 26, 208, 0.88)";

  return (
    <div style={{ background: color }} className="wash">
      {props.user} Washroom
    </div>
  );
};

export default Washroom;
import React from "react";

function Container(props) {
  const { children, className = "" } = props;
  return (
    <div
      className={`container mx-auto px-4 lg:px-10 3xl:w-[1100px] ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;

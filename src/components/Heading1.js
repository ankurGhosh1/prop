import React from "react";

function Heading1({ children, className }) {
  return (
    <h1
      className={`text-5xl font-bold flex-1 max-sm:text-center py-3 text-gray leading-normal max-sm:text-2xl ${className}`}
    >
      {children}
    </h1>
  );
}

export default Heading1;

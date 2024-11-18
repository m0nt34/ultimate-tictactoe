import React from "react";

const Flag = ({ className, fill = "#1f3540" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"

      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        d="M4 5a1 1 0 0 1 .3-.714a6 6 0 0 1 8.213-.176l.351.328a4 4 0 0 0 5.272 0l.249-.227c.61-.483 1.527-.097 1.61.676L20 5v9a1 1 0 0 1-.3.714a6 6 0 0 1-8.213.176l-.351-.328A4 4 0 0 0 6 14.448V21a1 1 0 0 1-1.993.117L4 21z"
      />
    </svg>
  );
};

export default Flag;

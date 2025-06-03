import React from "react";

const Skeleton: React.FC = () => {
  return (
    <div className="animate-pulse  mb-4">
      <div
        style={{ height: `${Math.floor(300 + Math.random() * 300)}px` }}
        className={`bg-gray-200 w-full rounded-lg`}
      ></div>
    </div>
  );
};

export default Skeleton;

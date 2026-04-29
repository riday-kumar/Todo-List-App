import React from "react";

const Loading = () => {
  return (
    <div className="flex gap-3 justify-center items-center h-dvh bg-primary text-white">
      <p className="text-5xl font-bold">Loading </p>
      <span className="loading loading-spinner text-warning text-5xl"></span>
    </div>
  );
};

export default Loading;

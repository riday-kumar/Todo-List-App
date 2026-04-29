import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar = () => {
  const percentage = 80;
  return (
    <div className="shadow-md p-5 rounded-2xl bg-white h-auto">
      <p className="text-center mb-10 text-2xl font-semibold">Task Progress</p>
      <div className="w-[50%] mx-auto">
        <CircularProgressbar
          styles={buildStyles({
            pathColor: "#4f47e6",
            textColor: "#4f47e6",
          })}
          value={percentage}
          text={`${percentage}%`}
        ></CircularProgressbar>
      </div>
      <div className="text-xl font-bold">
        <h3 className="text-primary">Total Task : 5</h3>
        <h3 className="text-green-600">Completed Task : 5</h3>
      </div>
    </div>
  );
};

export default ProgressBar;

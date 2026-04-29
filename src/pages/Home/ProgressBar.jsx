import React from "react";
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar = ({
  taskCompletingProgressPer,
  myTotalTask,
  myCompletedTask,
}) => {
  let percentage;
  if (taskCompletingProgressPer) {
    percentage = taskCompletingProgressPer.toFixed(2);
  } else {
    percentage = 0;
  }

  return (
    <div className="shadow-md p-5 rounded-2xl bg-white h-auto">
      <p className="text-center mb-10 text-2xl font-semibold">Task Progress</p>
      <div className="w-[50%] mx-auto">
        <CircularProgressbarWithChildren
          styles={buildStyles({
            pathColor: "#10B981",
            trailColor: "#D1FAE5",
            textColor: "#10B981",
          })}
          value={percentage}
          text={`${percentage}%`}
        >
          <strong className="mt-16 lg:mt-10 xl:mt-15 text-green-500 text-xl">
            Done
          </strong>
        </CircularProgressbarWithChildren>
      </div>
      <div className="text-xl font-bold py-5">
        {percentage >= 50 ? (
          <p className="text-center text-primary">
            <span className="text-yellow-500">Great Job!</span> You Have
            Completed <span className="text-[#10B981]">{myCompletedTask}</span>{" "}
            Out of <span className="text-red-500">{myTotalTask}</span>{" "}
            Tasks{" "}
          </p>
        ) : (
          <p className="text-center text-primary">
            <span className="text-red-600">Work Hard!</span> You Have Completed{" "}
            <span className="text-[#10B981]">{myCompletedTask}</span> Out of{" "}
            <span className="text-red-500">{myTotalTask}</span> Tasks{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;

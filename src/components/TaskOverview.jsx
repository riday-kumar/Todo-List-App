import React from "react";
import { FaClock } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";

const TaskOverview = () => {
  return (
    <div className="bg-white shadow-md border-l-4 border-blue-500  p-4 rounded-2xl flex justify-between items-center">
      <div className="flex justify-center items-center gap-5">
        {/* completed task input */}
        <div>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-primary"
          />
        </div>
        {/* task name , type ,time */}
        <div>
          <h2 className="text-2xl font-medium mb-3">
            Finalize Project Proposal
          </h2>
          <div className="flex justify-start items-center gap-3">
            <p className="badge badge-soft badge-secondary uppercase font-medium">
              HIGH
            </p>
            <div className="flex justify-center items-center gap-2">
              <FaClock />
              <p>9.00 AM</p>
            </div>
          </div>
        </div>
      </div>
      {/* update and delete button */}
      <div className="text-2xl flex justify-center items-center gap-4">
        <button className="btn btn-sm btn-warning text-white">
          <MdModeEdit className="text-2xl" />
        </button>
        <button className="btn btn-sm btn-error text-white">
          <MdDelete className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default TaskOverview;

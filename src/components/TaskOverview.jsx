import React, { useRef } from "react";
import { FaClock } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";

const TaskOverview = () => {
  const updateModalRef = useRef("update_modal");

  const closeAddModal = (e) => {
    e.preventDefault();
    updateModalRef.current.close();
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    updateModalRef.current.showModal();
  };

  const handleTaskDelete = () => {
    alert("are u sure?");
  };

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
        <button
          onClick={handleUpdateTask}
          className="btn btn-sm btn-warning text-white"
        >
          <MdModeEdit className="text-2xl" />
        </button>
        <button
          onClick={handleTaskDelete}
          className="btn btn-sm btn-error text-white"
        >
          <MdDelete className="text-2xl" />
        </button>
      </div>

      {/* ------------------ Update modal--------------- */}
      <dialog
        ref={updateModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h1 className="text-center text-3xl my-5">My Next Task</h1>

          <div className="modal-action">
            <form className="dialog w-[90%] mx-auto">
              <fieldset className="fieldset *:w-full text-xl">
                <input
                  type="text"
                  name="title"
                  className="input h-12 font-medium"
                  placeholder="Task Title"
                />
                <br />
                <textarea
                  name="description"
                  placeholder="Task Description"
                  className="input textarea"
                ></textarea>
                <br />
                <label htmlFor="priority">Task Priority</label>
                <select name="priority" id="" className="border-[3px]">
                  <option className="text-red-500" value="High">
                    High Priority
                  </option>
                  <option className="text-yellow-500" value="Medium">
                    Medium Priority
                  </option>
                  <option value="Low">Low Priority</option>
                </select>
                <br />
                <label htmlFor="date">Date</label>
                <input type="datetime-local" name="date" id="" />

                <div className="flex gap-2 mt-5">
                  <button
                    type="submit"
                    className="btn btn-success text-white w-28 font-bold"
                  >
                    Add
                  </button>
                  <button className="btn w-28" onClick={closeAddModal}>
                    Close
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TaskOverview;

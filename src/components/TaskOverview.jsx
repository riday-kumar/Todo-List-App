import React, { useRef, useState } from "react";
import { FaClock } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";

const TaskOverview = ({ tasks }) => {
  const updateModalRef = useRef("update_modal");
  const { user, reload, setReload, congratulation, setCongratulation } =
    useAuth();
  const [currentTask, setCurrentTask] = useState({});

  const closeAddModal = (e) => {
    e.preventDefault();
    updateModalRef.current.close();
  };

  const handleUpdateTaskBtn = (id) => {
    updateModalRef.current.showModal();
    fetch(`http://localhost:3000/all-task/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentTask({ ...data }));
  };

  // update form here
  const handleUpdateTaskForm = (e, id) => {
    e.preventDefault();
    console.log(id);
    const updatedTitle = e.target.updatedTitle.value;
    const updatedDescription = e.target.updatedDescription.value;
    const updatedPriority = e.target.updatedPriority.value;
    const updatedDate = e.target.updatedDate.value;

    const updatedTask = {
      updatedTitle,
      updatedDescription,
      updatedPriority,
      updatedDate,
    };

    // console.log(updatedTask);

    fetch(`http://localhost:3000/update-task/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          updateModalRef.current.close();
          toast.success("Task Updated");
          setReload(!reload);
        }
      });
  };

  // Task Delete Handler
  const handleTaskDelete = (id) => {
    fetch(`http://localhost:3000/delete-task/${id}?email=${user?.email}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("task Deleted!");
        setReload(!reload);
      });
  };

  // handle Complete Task
  const handleCompleteTask = async (id) => {
    fetch(`http://localhost:3000/task-complete/${id}?email=${user?.email}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Congratulation 🎉 Task Completed!");
          setReload(!reload);
          confetti({
            particleCount: 150,
            spread: 360,
          });
        }
      });
  };

  return (
    <>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white shadow-md border-l-4 border-blue-500  p-4 rounded-2xl flex justify-between items-center"
        >
          <div className="flex justify-center items-center gap-5">
            {/* completed task input */}
            <div>
              <input
                onChange={() => handleCompleteTask(task._id)}
                type="checkbox"
                className="checkbox checkbox-primary"
              />
            </div>
            {/*---------- task name , type ,time --------*/}
            <div>
              <h2 className="text-2xl font-medium mb-3">{task.taskTitle}</h2>
              <div className="flex justify-start items-center gap-3">
                <p
                  className={`badge badge-soft badge-secondary uppercase font-bold ${task.taskPriority == "High" ? "text-red-500" : task.taskPriority == "Medium" ? "text-yellow-500" : "text-black"}`}
                >
                  {task.taskPriority}
                </p>
                <div className="flex justify-center items-center gap-2">
                  <FaClock />

                  <p>
                    {new Date(task.taskTime).toLocaleDateString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* update and delete button */}
          <div className="text-2xl flex justify-center items-center gap-4">
            {/* ---------- update Button ---------- */}
            <button
              onClick={() => handleUpdateTaskBtn(task._id)}
              className="btn btn-sm btn-warning text-white"
            >
              <MdModeEdit className="text-2xl" />
            </button>
            {/* --------- Delete Button ------- */}
            <button
              onClick={() => handleTaskDelete(task._id)}
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
                {/* ---------- update From ------------ */}
                <form
                  onSubmit={(e) => handleUpdateTaskForm(e, currentTask._id)}
                  className="dialog w-[90%] mx-auto"
                >
                  <fieldset className="fieldset *:w-full text-xl">
                    <input
                      type="text"
                      name="updatedTitle"
                      className="input h-12 font-medium"
                      placeholder="Task Title"
                      defaultValue={currentTask?.taskTitle}
                    />
                    <br />
                    <textarea
                      name="updatedDescription"
                      placeholder="Task Description"
                      className="input textarea"
                      defaultValue={currentTask?.taskDescription}
                    ></textarea>
                    <br />
                    <label htmlFor="priority">Task Priority</label>

                    <select
                      name="updatedPriority"
                      defaultValue={currentTask?.taskPriority}
                      id="priority"
                      className="border-[3px]"
                    >
                      {" "}
                      <option
                        selected={currentTask.taskPriority === "High"}
                        className="text-red-500"
                        value="High"
                      >
                        High Priority{" "}
                      </option>{" "}
                      <option
                        selected={currentTask.taskPriority === "Medium"}
                        className="text-yellow-500"
                        value="Medium"
                      >
                        {" "}
                        Medium Priority{" "}
                      </option>{" "}
                      <option
                        selected={currentTask.taskPriority === "Low"}
                        value="Low"
                      >
                        Low Priority
                      </option>{" "}
                    </select>
                    <br />
                    <label htmlFor="date">Date</label>
                    <input
                      type="datetime-local"
                      defaultValue={currentTask?.taskTime}
                      name="updatedDate"
                      id="date"
                    />

                    <div className="flex gap-2 mt-5">
                      <button
                        type="submit"
                        className="btn btn-success text-white w-28 font-bold"
                      >
                        Update
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
      ))}
    </>
  );
};

export default TaskOverview;

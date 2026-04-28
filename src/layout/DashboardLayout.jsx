import React, { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdLogout } from "react-icons/md";
import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Avatar from "daisyui/components/avatar";

const DashboardLayout = () => {
  const addModalRef = useRef("add_modal");
  const [error, setError] = useState(null);

  const { googleLogIn, logOut, user } = useAuth();

  const handleGoogleLogin = () => {
    googleLogIn()
      .then((result) => {
        toast.success("Log in Successful");
        const newUser = { email: result.user.email };
        // const userEmail = result.
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogOut = () => {
    logOut()
      .then((res) => {
        toast.success("Log Our Successfully");
      })
      .catch((err) => console.log(err));
  };

  const closeAddModal = (e) => {
    e.preventDefault();
    addModalRef.current.close();
  };

  // add Task handler
  const handleAddTask = (e) => {
    e.preventDefault();
    addModalRef.current.showModal();
  };

  const handleAddTaskForm = (e) => {
    e.preventDefault();
    const taskTitle = e.target.title.value;
    const taskDescription = e.target.description.value;
    const taskPriority = e.target.priority.value;
    const taskTime = e.target.date.value;
    if (!taskTitle) {
      setError("Must Need a Task Title");
      return;
    }
    if (!taskTime) {
      setError("Need Date & Time");
      return;
    }

    console.log({
      taskTitle,
      taskDescription,
      taskPriority,
      taskTime,
    });
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-white flex justify-between">
          <div className="flex justify-center items-center">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 font-bold text-2xl text-primary">
              Focus Flow
            </div>
          </div>

          {/* user */}
          <div className="flex justify-center items-center gap-3">
            <button onClick={handleAddTask} className="btn btn-sm btn-primary">
              Add Task
            </button>
            {user ? (
              <img
                className="border-2 border-primary w-10 h-10 rounded-full"
                src={user.photoURL}
                alt=""
              />
            ) : (
              <FaUserCircle className="text-3xl" />
            )}
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4 bg-[#f8f9ff] ">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-[#f8fafc] flex min-h-full flex-col items-start is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </button>
            </li>

            {/* List item */}
          </ul>
          {/* google sign in button */}
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-lg btn-primary btn-outline is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Sign Out"
            >
              {" "}
              <MdLogout />{" "}
              <span className="is-drawer-close:hidden">Sign Out</span>
            </button>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="btn btn-lg btn-primary btn-outline is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Sign In With Google"
            >
              {" "}
              <FcGoogle />{" "}
              <span className="is-drawer-close:hidden">
                Sign In With Google
              </span>
            </button>
          )}
        </div>
      </div>
      {/* ------------------ add modal--------------- */}
      <dialog ref={addModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="text-center text-3xl my-5">My Next Task</h1>

          <div className="modal-action">
            <form
              onSubmit={handleAddTaskForm}
              className="dialog w-[90%] mx-auto"
            >
              {error && <p className="text-red-600 font-bold mb-3">{error}</p>}
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

export default DashboardLayout;

import React, { useEffect, useState } from "react";
import TaskOverview from "../../components/TaskOverview";
import ProgressBar from "./ProgressBar";
import useAuth from "../../hooks/useAuth";
import Guest from "./Guest";
import { FaCalendarAlt } from "react-icons/fa";
import Loading from "../../components/Loading";

const Home = () => {
  const { user, reload, loading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [circleData, setCircleData] = useState([]);

  // const email = user.email;
  console.log(user);
  useEffect(() => {
    if (user) {
      fetch(
        `https://todo-api-server-side.vercel.app/all-task?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
          setCircleData(data);
        });
    }
  }, [user, reload]);

  //  task will show according to the calender
  const handleCalenderTask = (date) => {
    // console.log(date);
    fetch(
      `https://todo-api-server-side.vercel.app/all-date-task/${date}?email=${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
    // const filteredTask = tasks.filter((task) => task.taskTime == date);
    // setTasks(filteredTask);
  };

  const today = new Date();

  // const thatDay = new Date().toISOString().split("T")[0];
  // const thatDay = new Date().toLocaleDateString("en-CA");

  const myTotalTask = circleData.filter(
    (task) => task.completedTask === false || task.completedTask === true,
  ).length;

  const myCompletedTask = circleData.filter(
    (task) => task.completedTask === true,
  ).length;

  const taskCompletingProgressPer = (myCompletedTask / myTotalTask) * 100;
  // console.log(taskCompletingProgressPer);

  // console.log({ todayTotalTask, todayCompletedTask });
  const taskRemaining = myTotalTask - myCompletedTask;

  const showRemainingTask = () => {
    setTasks(circleData);
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-[95%] xl:w-10/12 mx-auto h-dvh">
      {user ? (
        <div className="grid lg:grid-cols-6  xl:grid-cols-5 justify-center gap-10 w-full mt-10">
          <div className="max-lg:order-2 lg:col-span-4 xl:col-span-3 space-y-10">
            <div className="flex max-lg:flex-col max-lg:gap-5 justify-between items-center">
              {/* --------------- today, date------- */}
              <div>
                <p className="text-2xl">Today</p>
                <p className="text-xl text-gray-600 font-semibold">
                  {today.toLocaleDateString("en-Us", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                  <span> | </span>
                  <button
                    onClick={showRemainingTask}
                    className="btn btn-sm btn-dash btn-info text-xl font-bold"
                  >
                    {taskRemaining} task Remaining
                  </button>
                </p>
              </div>
              {/* ---------- calendar ----------------- */}
              <div>
                <input
                  onChange={(e) => handleCalenderTask(e.target.value)}
                  className="text-primary text-2xl font-bold"
                  type="date"
                />
              </div>
            </div>
            <TaskOverview tasks={tasks}></TaskOverview>
          </div>
          <aside className="lg:col-span-2 xl:col-span-2">
            <ProgressBar
              taskCompletingProgressPer={taskCompletingProgressPer}
              myCompletedTask={myCompletedTask}
              myTotalTask={myTotalTask}
            ></ProgressBar>
          </aside>
        </div>
      ) : (
        <Guest></Guest>
      )}
    </div>
  );
};

export default Home;

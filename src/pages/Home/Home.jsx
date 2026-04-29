import React, { useEffect, useState } from "react";
import TaskOverview from "../../components/TaskOverview";
import ProgressBar from "./ProgressBar";
import useAuth from "../../hooks/useAuth";
import Guest from "./Guest";
import { FaCalendarAlt } from "react-icons/fa";

const Home = () => {
  const { user, reload, loading } = useAuth();
  const [tasks, setTasks] = useState([]);

  // const email = user.email;
  console.log(user);
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/all-task?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setTasks(data));
    }
  }, [user, reload]);

  //  task will show according to the calender
  const handleCalenderTask = (date) => {
    console.log(date);
    fetch(`http://localhost:3000/all-date-task/${date}?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  };

  if (loading) {
    return <span>Loading...</span>;
  }

  const today = new Date();
  console.log(today);

  return (
    <div className="w-10/12 mx-auto h-dvh">
      {user ? (
        <div className="grid grid-cols-5 justify-center gap-10 w-full mt-10">
          <div className="col-span-3 space-y-10">
            <div className="flex justify-between items-center">
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
                  <span className="text-xl font-bold text-red-600">
                    4 task remaining
                  </span>
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
          <aside className="col-span-2">
            <ProgressBar></ProgressBar>
          </aside>
        </div>
      ) : (
        <Guest></Guest>
      )}
    </div>
  );
};

export default Home;

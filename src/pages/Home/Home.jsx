import React, { useEffect, useState } from "react";
import TaskOverview from "../../components/TaskOverview";
import ProgressBar from "./ProgressBar";
import useAuth from "../../hooks/useAuth";
import Guest from "./Guest";

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

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="w-10/12 mx-auto h-dvh">
      {user ? (
        <div className="grid grid-cols-5 justify-center gap-10 w-full mt-10">
          <div className="col-span-3 space-y-10">
            <div>
              <p className="text-2xl">Today</p>
              <p className="text-xl text-gray-600 font-semibold">
                Wednesday, Oct 25 <span className="text-2xl font-bold">.</span>{" "}
                4 task remaining
              </p>
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

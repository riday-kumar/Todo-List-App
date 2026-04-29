import React, { useEffect, useState } from "react";
import TaskOverview from "../../components/TaskOverview";
import Momentum from "./Momentum";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);
  const email = user?.email;
  useEffect(() => {
    fetch(`http://localhost:3000/all-task?email=${email}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [user, email, reload]);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="w-10/12 mx-auto h-dvh">
      <div className="grid grid-cols-5 justify-center gap-10 w-full mt-10">
        <div className="col-span-3 space-y-10">
          <div>
            <p className="text-2xl">Today</p>
            <p className="text-xl text-gray-600 font-semibold">
              Wednesday, Oct 25 <span className="text-2xl font-bold">.</span> 4
              task remaining
            </p>
          </div>
          <TaskOverview
            tasks={tasks}
            reload={reload}
            setReload={setReload}
          ></TaskOverview>
        </div>
        <aside className="col-span-2">
          <Momentum></Momentum>
        </aside>
      </div>
    </div>
  );
};

export default Home;

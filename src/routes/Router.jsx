import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home/Home";
import AddTask from "../pages/AddTask/AddTask";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "add",
        Component: AddTask,
      },
    ],
  },
]);

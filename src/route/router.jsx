import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import BuyerHome from "../pages/dashboard/buyer/BuyerHome";
import WorkerHome from "../pages/dashboard/worker/WorkerHome";
import AdminHome from "../pages/dashboard/admin/AdminHome";
import AddTask from "../pages/dashboard/buyer/AddTask";
import PurchaseCoins from "../pages/dashboard/buyer/PurchaseCoins";
import PaymentHistory from "../pages/dashboard/buyer/PaymentHistory";
import MyTasks from "../pages/dashboard/buyer/MyTasks";
import TaskList from "../pages/dashboard/worker/TaskList";
import TaskDetails from "../pages/dashboard/worker/TaskDetails";
import MySubmissions from "../pages/dashboard/worker/MySubmissions";
import Withdrawals from "../pages/dashboard/worker/Withdrawals";

 export const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayout,
   children:[
    {
        index:true,
        Component:Home
    },

{
            path:'login',
            Component:Login
        },
        {
            path:'register',
            Component:Register
        }    


]
},

{
    path: "/dashboard",
    element: <DashboardLayout/>, // Sidebar + TopNavbar
    children: [
      { path: "/dashboard/worker-home", element: <WorkerHome /> },
      {
        path:"/dashboard/tasks",
        element:<TaskList></TaskList>

      },
      {
        path:"/dashboard/task/:id",
        element:<TaskDetails></TaskDetails>
      },
      {
        path:"/dashboard/my-submissions",
        element:<MySubmissions></MySubmissions>
      },
      {
        path:"/dashboard/withdrawals",
        element:<Withdrawals></Withdrawals>
      },






      { path: "/dashboard/buyer-home", element: <BuyerHome/> },
      {
        path:"/dashboard/add-task",
        element:<AddTask></AddTask>
      },

      {
        path:"/dashboard/purchase-coins",
        element:<PurchaseCoins></PurchaseCoins>
      },
      {
        path:"/dashboard/payment-history",
        element:<PaymentHistory></PaymentHistory>
      },
      {
        path:"/dashboard/my-tasks",
        element:<MyTasks></MyTasks>
      },
      









      { path: "admin-home", element: <AdminHome /> },
    //   { path: "my-submissions", element: <MySubmissions /> },
      // more routes can be added here
    ],
  },



 ]);
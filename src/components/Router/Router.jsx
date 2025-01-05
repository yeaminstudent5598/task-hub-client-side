import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Login/Login";
import MainLayOut from "../MainLayOut/MainLayOut";
import Register from "../Register/Register";
import NotFound from "../MainLayOut/NotFound/NotFound";
import CreateAssignment from "../CreateAssignment/CreateAssignment";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Assignments from "../Assignments/Assignments";
import UpdateAssignment from "../Assignments/UpdateAssignment/UpdateAssignment";
import AssignmentDetails from "../AssignmentDetails/AssignmentDetails";
import PendingAssignments from "../PendingAssignments/PendingAssignments";
import MyAttemptedAssignments from "../MyAttemptedAssignments/MyAttemptedAssignments";
import Rules from "../Rules/Rules";


  const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut/>,
    errorElement: <NotFound/>,
      children: [
        {
            path:'/',
            element: <Home/>,
        },
        {
            path: '/login',
            element: <Login/>,
        },
        { 
            path: '/register',
            element: <Register/>
          },
          {
            path: "/create-assignment",
            element:  (
              <PrivateRoute>
                <CreateAssignment />
              </PrivateRoute>
            ),
          },
          {
            path: '/assignments',
            element: <Assignments/>,
          },
          {
            path: '/update-assignment/:id',
            element: (
              <PrivateRoute>
                <UpdateAssignment />
              </PrivateRoute>
            ),
            loader: ({ params }) => fetch(`https://task-hub-server-side.vercel.app/assignments/${params.id}`),
          },
          {
            path: '/assignment-details/:id',
            element: (
              <PrivateRoute>
                <AssignmentDetails />
              </PrivateRoute>
            ),
            loader: ({ params }) =>
              fetch(`https://task-hub-server-side.vercel.app/assignments/${params.id}`),
          },
          
          {
          path: '/pending-assignments',
          element:  (
            <PrivateRoute>
             <PendingAssignments/>
            </PrivateRoute>
          ),
          },
          
          {
            path: '/my-attempted-assignments',
            element:  (
              <PrivateRoute>
                <MyAttemptedAssignments/>
              </PrivateRoute>
            ),
          },
          {
            path: '/rules',
            element: <Rules/>
          }
      ]
    },
  ]);

export default Router;
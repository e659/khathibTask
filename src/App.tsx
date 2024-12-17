import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerificationCode from "./Components/VerificationCode/VerificationCode";
import Home from "./Components/Home/Home";
import { userContext } from "./Components/Context/userContext.jsx";
import Clients from "./Components/Clients/Clients.js";
import ClientDetails from "./Components/ClientDetails/ClientDetails.js";
import ProtectedRoute from "./Components/PrivetRoutes/PrivetRoutes.js";
import Employee from "./Components/Employee/Employee.js";
import Blog from "./Components/Blog/Blog.js";
import Workers from "./Components/Workers/Workers.js";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "Clients",
        element: (
          <ProtectedRoute>
         <Clients />
        </ProtectedRoute>
        ),
      },
      {
        path: "Clients/:clientId",
        element: <ClientDetails />,
      },
      {
        path: "Employee",
        element: (
          <ProtectedRoute>
         <Employee />
        </ProtectedRoute>
        ),
      },
      {
        path: "Blog",
        element: (
          <ProtectedRoute>
         <Blog />
        </ProtectedRoute>
        ),
      },
      {
        path: "Workers",
        element: (
          <ProtectedRoute>
         <Workers />
        </ProtectedRoute>
        ),
      },
      { path: "Login", element: <Login /> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "VerificationCode", element: <VerificationCode /> },
    ],
  },
]);
function App() {
  // user userContext
  const { setUserToken } = useContext(userContext);
  const { setUserData } = useContext(userContext);
  // usenavigate
 
  useEffect(() => {
    // to save token when refresh(rendering)
    if (
      localStorage.getItem("usertoken") &&
      localStorage.getItem("user") !== null
    ) {
      setUserToken(localStorage.getItem("usertoken"));
      setUserData(JSON.parse(localStorage.getItem("user")));
    }
  
   
  }, []);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;

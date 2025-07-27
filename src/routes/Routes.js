import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "../components/Authentication/RoleProtectedRoute";
import { useSelector } from "react-redux";
import { ROLES } from "../common/constants";

const Login = lazy(() => import("../pages/Authentication/Login"));
const Logout = lazy(() => import("../pages/Authentication/Logout"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Category = lazy(() => import("../pages/Category.jsx"));

const unauthorizedRoutes = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace={true} />,
  },
];

const authorizedRoutes = (auth, role) => {
  return [
    {
      path: "/",
      element: <ProtectedRoute redirectPath={"/login"} auth={auth} />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "category",
          element: <Category />,
        },
        {
          path: "logout",
          element: <Logout />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace={true} />,
    },
  ];
};
export const Routes = (auth) => {
  const authSelector = useSelector((state) => state.app.authUserReducer);
  return auth ? authorizedRoutes(auth, authSelector?.role) : unauthorizedRoutes;
};

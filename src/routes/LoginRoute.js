import { lazy } from "react";

const LoginRoute = [
  {
    path: "/login",
    Component: lazy(() => import("../pages/Login")),
  },
];

export default LoginRoute;

import { lazy } from "react";

const DashboardRoute = [
  {
    path: "/dashboard/*",
    Component: lazy(() => import("../pages/Dashboard")),
  },
];

export default DashboardRoute;

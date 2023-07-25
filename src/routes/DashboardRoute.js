import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = decodeCookie("token");

const DashboardRoute = [
  dataCookie?.roles === 1 && {
    path: "/dashboard/*",
    Component: lazy(() => import("../pages/Dashboard")),
  },
];

export default DashboardRoute;

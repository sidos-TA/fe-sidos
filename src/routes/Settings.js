import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = decodeCookie("token");
const SettingsRoute = [
  dataCookie?.roles === 1 && {
    path: "/settings",
    Component: lazy(() => import("../pages/Settings")),
  },
];

export default SettingsRoute;

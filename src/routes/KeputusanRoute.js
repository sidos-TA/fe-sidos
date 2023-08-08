import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = decodeCookie("token");

const KeputusanRoute = [
  {
    path: "/keputusan",
    Component: lazy(() => import("../pages/Keputusan")),
  },

  dataCookie?.roles === 1 && {
    path: "/keputusan/keputusan_Edit/:no_bp",
    Component: lazy(() => import("../pages/Keputusan/KeputusanEdit")),
  },
  dataCookie?.roles === 2 && {
    path: "/keputusan/keputusan_Detail",
    Component: lazy(() => import("../pages/Keputusan/KeputusanEdit")),
  },
];

export default KeputusanRoute;

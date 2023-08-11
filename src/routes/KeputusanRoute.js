import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = decodeCookie("token");

const KeputusanRoute = [
  {
    path: "/keputusan",
    Component: lazy(() => import("../pages/Keputusan")),
  },

  Object.keys(dataCookie)?.length && {
    path: "/keputusan/keputusan_Edit/:id_usulan",
    Component: lazy(() => import("../pages/Keputusan/KeputusanEdit")),
  },
  // dataCookie?.roles === 2 && {
  //   path: "/keputusan/keputusan_Detail",
  //   Component: lazy(() => import("../pages/Keputusan/KeputusanEdit")),
  // },
];

export default KeputusanRoute;

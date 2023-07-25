import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = decodeCookie("token");

const ProdiRoute = [
  dataCookie?.roles === 1 && {
    path: "/prodi",
    Component: lazy(() => import("../pages/Prodi")),
  },
  dataCookie?.roles === 1 && {
    path: "/prodi/prodi_Add",
    Component: lazy(() => import("../pages/Prodi/ProdiAdd")),
  },
];

export default ProdiRoute;

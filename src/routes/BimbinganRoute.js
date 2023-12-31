import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = decodeCookie("token");
const BimbinganRoute = [
  dataCookie?.roles === 1 && {
    path: "/bimbingan/",
    Component: lazy(() => import("../pages/Bimbingan/BimbinganLists")),
  },
  dataCookie?.roles === 1 && {
    path: "/bimbingan/bimbingan_Add",
    Component: lazy(() => import("../pages/Bimbingan/BimbinganAdd")),
  },
  dataCookie?.roles === 1 && {
    path: "/bimbingan/bimbingan_Detail/:id_usulan",
    Component: lazy(() => import("../pages/Bimbingan/BimbinganInfo")),
  },
];

export default BimbinganRoute;

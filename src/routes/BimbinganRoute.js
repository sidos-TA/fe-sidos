import { lazy } from "react";

const BimbinganRoute = [
  {
    path: "/bimbingan/",
    Component: lazy(() => import("../pages/Bimbingan/BimbinganList")),
  },
  {
    path: "/bimbingan/bimbingan_Add",
    Component: lazy(() => import("../pages/Bimbingan/BimbinganAdd")),
  },
];

export default BimbinganRoute;

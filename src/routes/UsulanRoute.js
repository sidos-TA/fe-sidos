import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = () => decodeCookie("token");

const UsulanRoute = [
  {
    path: "/usulan",
    Component: lazy(() => import("../pages/Usulan")),
  },
  dataCookie()?.roles === 2 && {
    path: "/usulan/usulan_Add",
    Component: lazy(() => import("../pages/Usulan/UsulanAdd")),
  },
  Object.keys(dataCookie())?.length && {
    path: "/usulan/usulan_edit/:id_usulan",
    Component: lazy(() => import("../pages/Usulan/UsulanEdit")),
  },
  // {
  //   path: "/usulan/usulan_detail",
  //   Component: lazy(() => import("../pages/Usulan/UsulanEdit")),
  // },
];

export default UsulanRoute;

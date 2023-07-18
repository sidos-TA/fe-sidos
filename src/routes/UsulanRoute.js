import { lazy } from "react";

const UsulanRoute = [
  {
    path: "/usulan",
    Component: lazy(() => import("../pages/Usulan/UsulanList")),
  },
  {
    path: "/usulan/usulan_Add",
    Component: lazy(() => import("../pages/Usulan/UsulanAdd")),
  },
  {
    path: "/usulan/usulan_edit/:no_bp",
    Component: lazy(() => import("../pages/Usulan/UsulanEdit")),
  },
];

export default UsulanRoute;

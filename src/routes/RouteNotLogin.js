import { lazy } from "react";

const RouteNotLogin = [
  {
    path: "/spk",
    Component: lazy(() => import("../pages/Usulan/UsulanAdd")),
  },
  {
    path: "/judul",
    Component: lazy(() => import("../pages/Judul")),
  },
  {
    path: "/forbidden_methods",
    Component: lazy(() => import("../pages/ForbiddenMethods")),
  },
];

export default RouteNotLogin;

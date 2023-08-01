import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = () => decodeCookie("token");
const ForbiddenMethodsRoute = [
  {
    path: "/forbidden_methods",
    Component: lazy(() => import("../pages/ForbiddenMethods")),
  },
  dataCookie()?.roles === 1 && {
    path: "/forbidden_methods/forbidden_methods_Add/*",
    Component: lazy(() =>
      import("../pages/ForbiddenMethods/ForbiddenMethodsAdd")
    ),
  },
  dataCookie()?.roles === 1 && {
    path: "/forbidden_methods/forbidden_methods_Edit/:id",
    Component: lazy(() =>
      import("../pages/ForbiddenMethods/ForbiddenMethodsEdit")
    ),
  },
];

export default ForbiddenMethodsRoute;

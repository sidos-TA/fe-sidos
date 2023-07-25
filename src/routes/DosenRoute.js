import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = () => decodeCookie("token");

const DosenRoute = [
  dataCookie()?.roles === 1 && {
    path: "/dosen",
    Component: lazy(() => import("../pages/Dosen")),
  },
  dataCookie()?.roles === 1 && {
    path: "/dosen/dosen_Add/*",
    Component: lazy(() => import("../pages/Dosen/DosenAdd")),
  },
  dataCookie()?.roles === 1 && {
    path: "/dosen/dosen_Info/:nip/*",
    Component: lazy(() => import("../pages/Dosen/DosenInfo")),
  },
];

export default DosenRoute;

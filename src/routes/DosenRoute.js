import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = () => decodeCookie("token");

const DosenRoute = [
  (dataCookie()?.roles === 1 || dataCookie()?.roles === 3) && {
    path: "/dosen",
    Component: lazy(() => import("../pages/Dosen")),
  },
  (dataCookie()?.roles === 1 || dataCookie()?.roles === 3) && {
    path: "/dosen/dosen_Add/*",
    Component: lazy(() => import("../pages/Dosen/DosenAdd")),
  },
  (dataCookie()?.roles === 1 || dataCookie()?.roles === 3) && {
    path: "/dosen/dosen_Info/:nip/*",
    Component: lazy(() => import("../pages/Dosen/DosenInfo")),
  },
  dataCookie()?.roles === 1 && {
    path: "dosen_prfl/*",
    Component: lazy(() => import("../pages/Dosen/DosenInfo")),
  },
];

export default DosenRoute;

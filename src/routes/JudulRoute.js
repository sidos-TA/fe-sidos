import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = () => decodeCookie("token");

const JudulRoute = [
  {
    path: "/judul",
    Component: lazy(() => import("../pages/Judul")),
  },
  dataCookie()?.roles === 1 && {
    path: "/judul/judul_Add/*",
    Component: lazy(() => import("../pages/Judul/JudulAdd")),
  },
  dataCookie()?.roles === 1 && {
    path: "/judul/judul_Edit/:id",
    Component: lazy(() => import("../pages/Judul/JudulEdit")),
  },
  //   {
  //     path: "/dosen/dosen_Add/*",
  //     Component: lazy(() => import("../pages/Dosen/DosenAdd")),
  //   },
  //   {
  //     path: "/dosen/dosen_Info/:nip/*",
  //     Component: lazy(() => import("../pages/Dosen/DosenInfo")),
  //   },
];

export default JudulRoute;

import { lazy } from "react";

const JudulRoute = [
  {
    path: "/judul",
    Component: lazy(() => import("../pages/Judul")),
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

import { lazy } from "react";

const DosenRoute = [
  {
    path: "/dosen/*",
    Component: lazy(() => import("../pages/Dosen")),
  },
];

export default DosenRoute;

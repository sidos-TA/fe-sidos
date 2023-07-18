import { lazy } from "react";

const MahasiswaRoute = [
  {
    path: "/mahasiswa",
    Component: lazy(() => import("../pages/Mahasiswa")),
  },
  {
    path: "/mahasiswa/mahasiswa_info/:no_bp/*",
    Component: lazy(() => import("../pages/Mahasiswa/MahasiswaInfo")),
  },
];

export default MahasiswaRoute;

import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = () => decodeCookie("token");
const MahasiswaRoute = [
  dataCookie()?.roles === 1 && {
    path: "/mahasiswa",
    Component: lazy(() => import("../pages/Mahasiswa")),
  },
  dataCookie()?.roles === 1 && {
    path: "/mahasiswa/mahasiswa_Add/*",
    Component: lazy(() => import("../pages/Mahasiswa/MahasiswaAdd")),
  },
  dataCookie()?.roles === 1 && {
    path: "/mahasiswa/mahasiswa_Info/:no_bp/*",
    Component: lazy(() => import("../pages/Mahasiswa/MahasiswaInfo")),
  },
  dataCookie()?.roles === 2 && {
    path: "profile/*",
    Component: lazy(() => import("../pages/Mahasiswa/MahasiswaInfo")),
  },
];

export default MahasiswaRoute;

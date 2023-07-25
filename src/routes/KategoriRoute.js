import { lazy } from "react";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const dataCookie = decodeCookie("token");
const KategoriRoute = [
  dataCookie?.roles === 1 && {
    path: "/kategori",
    Component: lazy(() => import("../pages/Kategori/")),
  },
];

export default KategoriRoute;

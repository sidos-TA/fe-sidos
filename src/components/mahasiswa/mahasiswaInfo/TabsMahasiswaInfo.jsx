import { lazy } from "react";
import { Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import decodeCookie from "../../../lib/src/helpers/decodeCookie";
import TabsSidos from "../../TabsSegmented";
import TitlePage from "../../TitlePage";

const TabsMahasiswaInfo = () => {
  const { no_bp } = useParams();
  const { pathname } = useLocation();
  const dataCookie = decodeCookie("token");

  const listTabs = [
    {
      label: <>Informasi</>,
      value: "profilemhs",
      element: lazy(() => import("./MahasiswaInfoProfile")),
    },
    {
      label: <>Dosen Pembimbing TA</>,
      value: "profilemhs_dospem",
      element: lazy(() => import("./MahasiswaInfoDospemList")),
    },
    {
      label: <>Judul TA</>,
      value: "profilemhs_judulTA",
      element: lazy(() => import("./MahasiswaInfoJudulTA")),
    },
  ];

  return (
    <Fragment>
      <TitlePage
        title="Info Mahasiswa"
        {...(dataCookie?.roles === 1 && {
          backRoute: "/mahasiswa",
        })}
      />
      <TabsSidos
        listTabs={listTabs}
        endpoint="getMhsByNoBp"
        payload={{
          no_bp:
            pathname?.includes("/profile") && dataCookie?.roles === 2
              ? dataCookie?.no_bp
              : no_bp,
        }}
      />
    </Fragment>
  );
};
export default TabsMahasiswaInfo;

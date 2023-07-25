import { Fragment, lazy } from "react";
import { useLocation, useParams } from "react-router-dom";
import TabsSegmented from "../../components/TabsSegmented";
import TitlePage from "../../components/TitlePage";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const MahasiswaInfo = () => {
  const { no_bp } = useParams();
  const { pathname } = useLocation();
  const dataCookie = decodeCookie("token");

  const listTabs = [
    {
      label: <>Informasi</>,
      value: "profilemhs",
      element: lazy(() => import("./components/Profile")),
    },
    {
      label: <>Dosen Pembimbing TA</>,
      value: "profilemhs_dospem",
      element: lazy(() => import("./components/DospemList")),
    },
    {
      label: <>Judul TA</>,
      value: "profilemhs_judulTA",
      element: lazy(() => import("./components/JudulTA")),
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
      <TabsSegmented
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

export default MahasiswaInfo;

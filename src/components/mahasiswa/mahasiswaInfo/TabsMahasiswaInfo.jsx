import { useState } from "react";
import { lazy } from "react";
import { Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import getYearNow from "../../../lib/src/constants/getYearNow";
import decodeCookie from "../../../lib/src/helpers/decodeCookie";
import TabsSidos from "../../TabsSegmented";
import TitlePage from "../../TitlePage";

const TabsMahasiswaInfo = () => {
  const { no_bp } = useParams();
  const { pathname } = useLocation();
  const dataCookie = decodeCookie("token");
  const [payload, setPayload] = useState();

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
          ...payload,
          no_bp:
            pathname?.includes("/profile") && dataCookie?.roles === 2
              ? dataCookie?.no_bp
              : no_bp,
        }}
        tabsContext={{
          payload,
          setPayload,
        }}
      />
    </Fragment>
  );
};
export default TabsMahasiswaInfo;

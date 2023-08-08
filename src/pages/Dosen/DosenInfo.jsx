import { lazy, useState } from "react";
import { Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import FilterSemester from "../../components/FilterSemester";
import TabsSegmented from "../../components/TabsSegmented";
import TitlePage from "../../components/TitlePage";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const DosenInfo = () => {
  const { nip } = useParams();
  const { pathname } = useLocation();

  const dataCookie = decodeCookie("token");

  const [payload, setPayload] = useState({});

  const listTabs = [
    {
      label: <>Informasi</>,
      value: "profiledosen",
      element: lazy(() =>
        import("../../components/dosen/dosenDetail/DosenDetailProfile")
      ),
    },
    {
      label: <>Mahasiswa Bimbingan</>,
      value: "mahasiswabimbingan",
      element: lazy(() =>
        import("../../components/dosen/dosenDetail/MahasiswaBimbingan")
      ),
    },
    {
      label: <>Penelitian</>,
      value: "penelitian",
      element: lazy(() =>
        import("../../components/dosen/dosenDetail/Penelitian")
      ),
    },
  ];

  return (
    <Fragment>
      <TitlePage
        title="Info Dosen"
        {...(!pathname?.includes("dosen_prfl") && {
          backRoute: "/dosen",
        })}
      />
      <TabsSegmented
        listTabs={listTabs}
        endpoint="getDosenByNIP"
        payload={{
          ...payload,
          nip: pathname?.includes("dosen_prfl") ? dataCookie?.nip : nip,
        }}
        tabsContext={{
          payload,
          setPayload,
          nip: pathname?.includes("dosen_prfl") ? dataCookie?.nip : nip,
        }}
      />
    </Fragment>
  );
};
export default DosenInfo;

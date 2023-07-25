import { lazy } from "react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import TabsSegmented from "../../components/TabsSegmented";
import TitlePage from "../../components/TitlePage";

const DosenInfo = () => {
  const { nip } = useParams();
  const listTabs = [
    {
      label: <>Informasi</>,
      value: "profiledosen",
      element: lazy(() => import("../../components/dosen/dosenDetail/Profile")),
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
      <TitlePage title="Info Dosen" backRoute="/dosen" />
      <TabsSegmented
        listTabs={listTabs}
        endpoint="getDosenByNIP"
        payload={{
          nip,
        }}
        tabsContext={{
          nip,
        }}
      />
    </Fragment>
  );
};
export default DosenInfo;

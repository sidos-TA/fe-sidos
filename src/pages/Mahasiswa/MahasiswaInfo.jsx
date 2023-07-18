import { Fragment, lazy } from "react";
import { useParams } from "react-router-dom";
import TabsSegmented from "../../components/TabsSegmented";
import TitlePage from "../../components/TitlePage";

const MahasiswaInfo = () => {
  const { no_bp } = useParams();
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
      <TitlePage title="Info Mahasiswa" backRoute={`/mahasiswa`} />
      <TabsSegmented
        listTabs={listTabs}
        routes={listTabs?.map((tab) => ({
          element: tab?.element,
          path: tab?.value,
        }))}
        endpoint="getMhsByNoBp"
        payload={{
          no_bp,
        }}
      />
    </Fragment>
  );
};

export default MahasiswaInfo;

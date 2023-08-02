import { useTabsContext } from "../../../context/TabsContext";
import noDataIllustrate from "../../../assets/noData.svg";
import { lazy } from "react";
import { Suspense } from "react";
import LoadingSidos from "../../../lib/src/components/LoadingSidos";

const BimbinganComponent = lazy(() => import("../../BimbinganComponent"));

const MahasiswaBimbingan = () => {
  const { state } = useTabsContext();
  return (
    <Suspense fallback={<LoadingSidos />}>
      <BimbinganComponent
        arrDatasBimbingan={state?.datas?.mh}
        src={noDataIllustrate}
        titleSection="Mahasiswa Bimbingan"
        textNoData="Belum ada Mahasiswa Bimbingan"
      />
    </Suspense>
  );
};

export default MahasiswaBimbingan;

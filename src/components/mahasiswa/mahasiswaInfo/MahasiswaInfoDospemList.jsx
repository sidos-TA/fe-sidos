import { useTabsContext } from "../../../context/TabsContext";
import noDospemIllustrate from "../../../assets/noDospem.svg";
import { lazy } from "react";
import { Suspense } from "react";
import LoadingSidos from "../../../lib/src/components/LoadingSidos";

const BimbinganComponent = lazy(() => import("../../BimbinganComponent"));

const MahasiswaDetailDospemList = () => {
  const { state } = useTabsContext();

  return (
    <Suspense fallback={<LoadingSidos />}>
      <BimbinganComponent
        titleSection="Dosen Pembimbing"
        src={noDospemIllustrate}
        textNoData={`${state?.datas?.name} belum ada Dosen Pembimbing`}
        arrDatasBimbingan={state?.datas?.dosPem}
      />
    </Suspense>
  );
};
export default MahasiswaDetailDospemList;

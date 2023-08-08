import { useTabsContext } from "../../../context/TabsContext";
import noDospemIllustrate from "../../../assets/noDospem.svg";
import { lazy } from "react";
import { Suspense } from "react";
import LoadingSidos from "../../../lib/src/components/LoadingSidos";
import { Divider } from "antd";
import FilterSemester from "../../FilterSemester";

const BimbinganComponent = lazy(() => import("../../BimbinganComponent"));

const MahasiswaDetailDospemList = () => {
  const { state, payload, setPayload } = useTabsContext();

  const arrDatasUsulan = state?.datas?.dosen;

  const arrDatasBimbingan = arrDatasUsulan?.filter(
    (bimbingan) => bimbingan?.status_usulan === "confirmed"
  );

  arrDatasBimbingan?.forEach((bimbing) => {
    delete bimbing["dosen"];
  });

  return (
    <Suspense fallback={<LoadingSidos />}>
      <FilterSemester payloadState={payload} setStatePayload={setPayload} />
      <BimbinganComponent
        titleSection="Dosen Pembimbing"
        src={noDospemIllustrate}
        textNoData={`${state?.datas?.name} belum ada Dosen Pembimbing`}
        arrDatasBimbingan={arrDatasBimbingan}
        badgeText="Dosen Pembimbing"
        propMainInfo="name"
        propSubInfo="pendidikan"
        propBody="jabatan"
      />
      <Divider orientation="center">Dosen yang diusulkan</Divider>
      <BimbinganComponent
        src={noDospemIllustrate}
        textNoData={`${state?.datas?.name} belum melakukan pengusulan judul TA`}
        arrDatasBimbingan={arrDatasUsulan}
        badgeText="Dosen Pembimbing"
        propMainInfo="name"
        propSubInfo="pendidikan"
        propBody="jabatan"
      />
    </Suspense>
  );
};
export default MahasiswaDetailDospemList;

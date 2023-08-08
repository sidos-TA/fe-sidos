import { useTabsContext } from "../../../context/TabsContext";
import noDataIllustrate from "../../../assets/noData.svg";
import { lazy } from "react";
import { Suspense } from "react";
import LoadingSidos from "../../../lib/src/components/LoadingSidos";
import FilterSemester from "../../FilterSemester";

const BimbinganComponent = lazy(() => import("../../BimbinganComponent"));

const MahasiswaBimbingan = () => {
  const { state, payload, setPayload } = useTabsContext();
  const arrDatasMhsBimbing = state?.datas?.usulans?.map((usul) => ({
    ...usul,
    ...usul?.mh,
  }));

  arrDatasMhsBimbing?.forEach((bimbing) => {
    delete bimbing["mh"];
  });

  return (
    <Suspense fallback={<LoadingSidos />}>
      <FilterSemester payloadState={payload} setStatePayload={setPayload} />

      <BimbinganComponent
        arrDatasBimbingan={arrDatasMhsBimbing}
        src={noDataIllustrate}
        titleSection="Mahasiswa Bimbingan"
        textNoData="Belum ada Mahasiswa Bimbingan"
        badgeText="Mahasiswa"
        propMainInfo="name"
        propSubInfo="prodi"
        propBody="judul"
      />
    </Suspense>
  );
};

export default MahasiswaBimbingan;

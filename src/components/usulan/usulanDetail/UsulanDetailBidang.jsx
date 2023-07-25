import { Fragment } from "react";
import { useUsulanFormContext } from "../../../context/Usulan/UsulanFormContext";
import TagSidos from "../../../lib/src/components/TagSidos";

const UsulanDetailBidang = () => {
  const { state } = useUsulanFormContext();
  const dosenDetail = state?.objDosenDetail;

  return (
    <Fragment>
      {JSON.parse(dosenDetail?.bidang || "[]")?.map((bidang, idx) => (
        <TagSidos key={idx}>{bidang}</TagSidos>
      ))}
    </Fragment>
  );
};

export default UsulanDetailBidang;

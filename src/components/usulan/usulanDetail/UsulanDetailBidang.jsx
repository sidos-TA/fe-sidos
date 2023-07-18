import { Fragment } from "react";
import { useUsulanAddContext } from "../../../context/Usulan/UsulanAddContext";
import TagSidos from "../../../lib/src/components/TagSidos";

const UsulanDetailBidang = () => {
  const { state } = useUsulanAddContext();
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

import { Fragment } from "react";
import { useUsulanFormContext } from "../../../context/Usulan/UsulanFormContext";
import TagSidos from "../../../lib/src/components/TagSidos";

const UsulanDetailBidang = () => {
  const { state } = useUsulanFormContext();

  return (
    <Fragment>
      {state?.objDosenDetail?.bidangs?.map((dsnBidang, idx) => (
        <TagSidos key={idx}>{dsnBidang?.bidang}</TagSidos>
      ))}
    </Fragment>
  );
};

export default UsulanDetailBidang;

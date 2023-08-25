import { Fragment } from "react";
import TagSidos from "../../lib/src/components/TagSidos";

const DosenBidang = ({ stateModal }) => {
  return (
    <Fragment>
      {stateModal?.objDosenDetail?.bidangs?.map((dsnBidang, idx) => (
        <TagSidos key={idx}>{dsnBidang?.bidang}</TagSidos>
      ))}
    </Fragment>
  );
};

export default DosenBidang;

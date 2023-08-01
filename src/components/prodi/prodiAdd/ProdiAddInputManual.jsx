import { Fragment } from "react";
import TitleSection from "../../TitleSection";
import ProdiForm from "../ProdiForm";

const ProdiAddInputManual = () => {
  return (
    <Fragment>
      <TitleSection title="Input Manual" />
      <ProdiForm title="Input Manual" submitEndpoint="addProdi" />
    </Fragment>
  );
};
export default ProdiAddInputManual;

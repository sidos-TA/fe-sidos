import { Fragment } from "react";
import { useTabsContext } from "../../../context/TabsContext";
import TitleSection from "../../TitleSection";
import DosenForm from "./DosenForm";

const DosenAddInputManual = () => {
  const { FormDosen } = useTabsContext();
  return (
    <Fragment>
      <TitleSection title="Input Manual" />
      <DosenForm formInstance={FormDosen} />
    </Fragment>
  );
};

export default DosenAddInputManual;

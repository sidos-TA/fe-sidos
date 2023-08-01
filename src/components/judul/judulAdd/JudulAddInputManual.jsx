import { Fragment } from "react";
import TitleSection from "../../TitleSection";
import JudulForm from "../JudulForm";

const JudulAddInputManual = () => {
  return (
    <Fragment>
      <TitleSection title="Input Manual" />
      <JudulForm title="Tambah Judul" submitEndpoint="addJudul" />
    </Fragment>
  );
};
export default JudulAddInputManual;

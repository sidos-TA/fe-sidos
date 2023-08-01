import { Fragment } from "react";
import TitleSection from "../../TitleSection";
import ForbiddenMethodsForm from "../ForbiddenMethodsForm";

const ForbiddenMethodsAddInputManual = () => {
  return (
    <Fragment>
      <TitleSection title="Input Manual" />
      <ForbiddenMethodsForm submitEndpoint="addforbidmethods" />
    </Fragment>
  );
};
export default ForbiddenMethodsAddInputManual;

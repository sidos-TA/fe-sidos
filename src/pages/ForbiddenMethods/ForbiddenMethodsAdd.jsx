import { Fragment } from "react";
import ForbiddenMethodsAddComponents from "../../components/forbiddenmethods/forbiddenMethodsAdd";
import TitlePage from "../../components/TitlePage";

const ForbiddenMethodsAdd = () => {
  return (
    <Fragment>
      <TitlePage
        backRoute="/forbidden_methods"
        title="Tambah Metode yang tidak diterima"
      />

      <ForbiddenMethodsAddComponents />
    </Fragment>
  );
};
export default ForbiddenMethodsAdd;

import { Fragment } from "react";
import TitlePage from "../../components/TitlePage";

const ForbiddenMethodsAdd = () => {
  return (
    <Fragment>
      <TitlePage
        backRoute="/forbidden_methods"
        title="Tambah Metode yang tidak diterima"
      />
    </Fragment>
  );
};
export default ForbiddenMethodsAdd;

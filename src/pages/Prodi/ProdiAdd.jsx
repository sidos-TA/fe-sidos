import { Fragment } from "react";
import ProdiAddComponents from "../../components/prodi/prodiAdd";
import TitlePage from "../../components/TitlePage";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const ProdiAdd = () => {
  const dataCookie = decodeCookie("token");

  return (
    <Fragment>
      <TitlePage
        title="Tambah Prodi"
        {...(dataCookie?.roles === 1 && {
          backRoute: "/prodi",
        })}
      />
      <ProdiAddComponents />
    </Fragment>
  );
};
export default ProdiAdd;

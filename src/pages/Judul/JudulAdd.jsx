import { Fragment } from "react";
import JudulAddComponents from "../../components/judul/judulAdd";
import TitlePage from "../../components/TitlePage";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const JudulAdd = () => {
  const dataCookie = decodeCookie("token");

  return (
    <Fragment>
      <TitlePage
        title="Tambah Judul"
        {...(dataCookie?.roles === 1 && {
          backRoute: "/judul",
        })}
      />
      <JudulAddComponents />
    </Fragment>
  );
};
export default JudulAdd;

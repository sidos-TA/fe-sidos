import { Fragment } from "react";
import { useUsulanFormContext } from "../../context/Usulan/UsulanFormContext";
import BtnSidos from "../../lib/src/components/BtnSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const BtnActionUsulan = () => {
  const { state, form, type, submitUsulan } = useUsulanFormContext();
  const dataCookie = decodeCookie("token");

  const btnTextHandler = () => {
    const arrUsulanDospemLength = state?.arrUsulanDospem?.length;
    if (arrUsulanDospemLength === 0) {
      return "Update To Unavailable";
    } else if (arrUsulanDospemLength === 1) {
      return "Update partially confirm";
    } else {
      // return "Tambah Bimbingan";
      return "Tentukan Dosen Pembimbing";
    }
  };

  if (Object?.keys(dataCookie)?.length) {
    if (
      type === "edit" &&
      dataCookie?.roles === 1 &&
      state?.status_usulan !== "confirm"
    ) {
      return (
        <BtnSidos
          loading={state?.isLoadingAdd}
          disabled={state?.arrUsulanDospem?.length > 2}
          position="center"
          type="primary"
          onClick={() => {
            form.validateFields()?.then(() => {
              submitUsulan();
            });
          }}
        >
          {btnTextHandler()}
        </BtnSidos>
      );
    } else if (dataCookie?.roles === 2 && type !== "edit") {
      return (
        <BtnSidos
          loading={state?.isLoadingAdd}
          disabled={
            state?.arrUsulanDospem?.length !== state?.settings?.maksimal_usulan
          }
          position="center"
          type="primary"
          onClick={() => {
            form.validateFields()?.then(() => {
              submitUsulan();
            });
          }}
        >
          Usulkan
        </BtnSidos>
      );
    }
  }
  return <Fragment />;
};
export default BtnActionUsulan;

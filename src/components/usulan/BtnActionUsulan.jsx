import { Fragment } from "react";
import { useUsulanFormContext } from "../../context/Usulan/UsulanFormContext";
import BtnSidos from "../../lib/src/components/BtnSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const BtnActionUsulan = () => {
  const { state, form, type, submitUsulan } = useUsulanFormContext();
  const dataCookie = decodeCookie("token");

  if (Object?.keys(dataCookie)?.length) {
    if (
      type === "edit" &&
      dataCookie?.roles === 1 &&
      state?.status_usulan !== "confirm"
    ) {
      if (state?.arrUsulanDospem?.length === 0) {
        return (
          <BtnSidos
            loading={state?.isLoadingAdd}
            position="center"
            type="primary"
            onClick={() => {
              form.validateFields()?.then(() => {
                submitUsulan();
              });
            }}
          >
            Update To Unavailable
          </BtnSidos>
        );
      } else if (state?.arrUsulanDospem?.length === 1) {
        return (
          <BtnSidos
            loading={state?.isLoadingAdd}
            position="center"
            type="primary"
            onClick={() => {
              form.validateFields()?.then(() => {
                submitUsulan();
              });
            }}
          >
            Update partially confirm
          </BtnSidos>
        );
      }
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
          Tambah Bimbingan
        </BtnSidos>
      );
    } else if (dataCookie?.roles === 2 && type !== "edit") {
      return (
        <BtnSidos
          loading={state?.isLoadingAdd}
          disabled={state?.arrUsulanDospem?.length !== 3}
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

import { Fragment } from "react";
import { useUsulanFormContext } from "../../context/Usulan/UsulanFormContext";
import BtnSidos from "../../lib/src/components/BtnSidos";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import LabelSidos from "../../lib/src/components/FormSidos/fields/LabelSidos";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const FormSPK = ({ ...props }) => {
  const { form, state, setState, type } = useUsulanFormContext();
  const dataCookie = decodeCookie("token");

  return (
    <FormSidos
      form={form}
      initialValues={{
        isJdlFromDosen: "tidak",
        jdl_from_dosen: "",
      }}
      {...props}
    >
      {type === "edit" && (
        <LabelSidos label="Nama Mahasiswa">{state?.mhsName}</LabelSidos>
      )}
      <Field type="text" required label="Judul" name="judul" />
      <Field
        type="select"
        required
        label="Bidang"
        name="bidang"
        endpoint="getDataBidang"
      />

      {Object.keys(dataCookie)?.length ? (
        <Fragment>
          <Field
            type="radio"
            label="Apakah Judul Dari Dosen"
            name="isJdlFromDosen"
            listOptions={[
              {
                label: "Ya",
                value: "ya",
              },
              {
                label: "Tidak",
                value: "tidak",
              },
            ]}
            onChange={(value) => {
              setState({
                ...state,
                isJdlFromDosen: value,
              });
            }}
          />
          {state?.isJdlFromDosen === "ya" && (
            <Field
              label="Nama Dosen"
              name="jdl_from_dosen"
              type="select"
              endpoint="getAllDosen"
              selectLabel="name"
              selectValue="name"
              required
            />
          )}
          <Field
            required
            label="File pra-proposal"
            name="file_pra_proposal"
            type="upload"
            showUploadList={{
              showDownloadIcon: type === "edit",
              showRemoveIcon: type !== "edit",
            }}
            accept=".pdf"
            {...(type === "edit" && {
              fileList: [
                {
                  name: `${dataCookie?.name} - File pra-proposal.pdf`,
                  status: "done",
                  url: `${form?.getFieldValue("file_pra_proposal")}`,
                },
              ],
            })}
          >
            <BtnSidos>Upload</BtnSidos>
          </Field>
        </Fragment>
      ) : (
        <Fragment />
      )}
    </FormSidos>
  );
};
export default FormSPK;

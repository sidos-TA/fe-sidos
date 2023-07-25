import { useUsulanFormContext } from "../../context/Usulan/UsulanFormContext";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import LabelSidos from "../../lib/src/components/FormSidos/fields/LabelSidos";
import RadioSidos from "../../lib/src/components/FormSidos/fields/RadioSidos";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";

const FormSPK = ({ ...props }) => {
  const { form, state, setState, type } = useUsulanFormContext();

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
      <InputSidos required label="Judul" name="judul" />
      <SelectSidos
        required
        label="Bidang"
        name="bidang"
        endpoint="getDataBidang"
      />
      <RadioSidos
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
        <SelectSidos
          label="Nama Dosen"
          name="jdl_from_dosen"
          type="select"
          endpoint="getAllDosen"
          selectLabel="name"
          selectValue="name"
          required
        />
      )}
    </FormSidos>
  );
};
export default FormSPK;

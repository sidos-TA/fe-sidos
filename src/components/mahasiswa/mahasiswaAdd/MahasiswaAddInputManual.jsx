import { Form } from "antd";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import tingkatanProdiList from "../../../constants/tingkatanProdiList";
import Field from "../../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../../lib/src/components/FormSidos/form/FormSidos";
import TitleSection from "../../TitleSection";

const MahasiswaAddInputManual = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  return (
    <Fragment>
      <TitleSection title="Input Manual" />
      <FormSidos
        form={form}
        submitEndpoint="addMhs"
        afterMessageActionClose={() => {
          navigate("/mahasiswa");
        }}
      >
        <Field type="text" name="no_bp" label="No. Bp" required />
        <Field type="text" name="name" label="Nama Mahasiswa" required />
        <Field
          type="select"
          name="prodi"
          label="Prodi"
          endpoint="getAllProdi"
          required
          selectLabel="prodiName"
          selectValue="prodiName"
        />
        <Field
          type="select"
          name="tingkatan"
          label="Tingkatan"
          listOptions={tingkatanProdiList}
          required
        />
      </FormSidos>
    </Fragment>
  );
};
export default MahasiswaAddInputManual;

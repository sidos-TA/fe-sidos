import { Form } from "antd";
import { Fragment } from "react";
import tingkatanProdiList from "../../../constants/tingkatanProdiList";
import Field from "../../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../../lib/src/components/FormSidos/form/FormSidos";
import TitleSection from "../../TitleSection";

const MahasiswaAddInputManual = () => {
  const [form] = Form.useForm();
  return (
    <Fragment>
      <TitleSection title="Input Manual" />
      <FormSidos form={form}>
        <Field type="text" name="no_bp" label="No. Bp" required />
        <Field type="text" name="name" label="Nama Mahasiswa" required />
        <Field
          type="select"
          name="tingkatan"
          label="Tingkatan"
          listOptions={tingkatanProdiList}
          required
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

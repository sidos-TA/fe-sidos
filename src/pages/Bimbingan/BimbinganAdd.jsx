import { Form } from "antd";
import { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";

const BimbinganAdd = () => {
  const [form] = Form.useForm();
  return (
    <Fragment>
      <TitlePage title="Tambah Bimbingan" backRoute="/bimbingan" />
      <FormSidos form={form}>
        <Field type="text" label="Judul" name="name" required />
      </FormSidos>
    </Fragment>
  );
};
export default BimbinganAdd;

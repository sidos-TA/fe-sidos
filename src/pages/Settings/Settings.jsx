import { Form } from "antd";
import { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";

const Settings = () => {
  const [FormSettings] = Form.useForm();
  return (
    <Fragment>
      <TitlePage title="Settings" />
      <FormSidos form={FormSettings}>
        <Field type="text" name="kuota_bimbingan" label="Kuota Bimbingan" />
      </FormSidos>
    </Fragment>
  );
};
export default Settings;

import { Form } from "antd";
import { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";

const Settings = () => {
  const [FormSettings] = Form.useForm();
  return (
    <Fragment>
      <TitlePage title="Settings" />
      <FormSidos form={FormSettings}>
        <InputSidos name="kuota_bimbingan" label="Kuota Bimbingan" />
      </FormSidos>
    </Fragment>
  );
};
export default Settings;

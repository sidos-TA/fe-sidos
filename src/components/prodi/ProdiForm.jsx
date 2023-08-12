import { Form } from "antd";
import { Fragment } from "react";
import tingkatanProdiList from "../../constants/tingkatanProdiList";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";

const ProdiForm = ({ submitEndpoint, endpoint, deleteEndpoint, id }) => {
  const [FormProdi] = Form.useForm();
  return (
    <Fragment>
      <FormSidos
        form={FormProdi}
        submitEndpoint={submitEndpoint}
        {...(endpoint && { endpoint, payloadFetch: { id } })}
        {...(deleteEndpoint && { deleteEndpoint, payloadDelete: { id } })}
      >
        <Field type="text" name="prodiName" label="Prodi" />
        <Field
          type="select"
          name="tingkatan"
          label="Tingkatan"
          listOptions={tingkatanProdiList}
        />
      </FormSidos>
    </Fragment>
  );
};
export default ProdiForm;

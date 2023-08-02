import { Form } from "antd";
import { Fragment } from "react";
import tingkatanProdiList from "../../constants/tingkatanProdiList";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import isStringParseArray from "../../lib/src/helpers/isStringParseArray";

const ForbiddenMethodsForm = ({
  submitEndpoint,
  endpoint,
  deleteEndpoint,
  id,
}) => {
  const [form] = Form.useForm();
  return (
    <Fragment>
      <FormSidos
        form={form}
        submitEndpoint={submitEndpoint}
        payloadSubmit={{ id }}
        beforeSubmit={() => {
          return {
            ...form?.getFieldsValue(),
            bidang: JSON.stringify(form?.getFieldValue("bidang")),
          };
        }}
        customFetch={(formData) => {
          form?.setFieldsValue({
            ...formData,
            bidang: isStringParseArray(formData?.bidang)
              ? JSON.parse(formData?.bidang)
              : formData?.bidang,
          });
        }}
        {...(endpoint && { endpoint, payloadFetch: { id } })}
        {...(deleteEndpoint && { deleteEndpoint, payloadDelete: { id } })}
      >
        <Field name="methodName" label="Nama Metode" type="text" required />
        <Field
          name="bidang"
          label="Bidang"
          type="select"
          required
          mode="tags"
          endpoint="getDataBidang"
        />
        <Field
          required
          name="tingkatan"
          label="Tingkatan"
          type="select"
          listOptions={tingkatanProdiList}
        />
      </FormSidos>
    </Fragment>
  );
};
export default ForbiddenMethodsForm;

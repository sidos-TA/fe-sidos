import { Form } from "antd";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import tingkatanProdiList from "../../constants/tingkatanProdiList";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";

const JudulForm = ({ submitEndpoint, endpoint, deleteEndpoint, id }) => {
  const [FormJudul] = Form.useForm();
  const navigate = useNavigate();
  return (
    <Fragment>
      <FormSidos
        form={FormJudul}
        {...(id && {
          payload: {
            id,
          },
        })}
        {...(endpoint && {
          endpoint,
        })}
        submitEndpoint={submitEndpoint}
        {...(deleteEndpoint && {
          deleteEndpoint,
          payloadDelete: {
            id,
          },
        })}
        afterFetchSuccesHandler={(formData) => {
          if (formData === null) {
            navigate("/judul");
          }
        }}
      >
        <Field name="judul" required label="Judul" type="text" />
        <Field
          required
          name="bidang"
          label="Bidang"
          type="select"
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
export default JudulForm;

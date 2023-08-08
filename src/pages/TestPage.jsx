import { Form, Typography } from "antd";
import { Fragment, useState } from "react";
import TitlePage from "../components/TitlePage";
import BtnSidos from "../lib/src/components/BtnSidos";
import Field from "../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../lib/src/components/FormSidos/form/FormSidos";

const TestPage = () => {
  const [form] = Form.useForm();
  const [base64URLFile, setBase64URLFile] = useState("");

  return (
    <Fragment>
      <TitlePage title="Test Page" />
      <FormSidos form={form}>
        <Field type="upload" name="haha" required label="Upload">
          <BtnSidos type="primary">Upload</BtnSidos>
        </Field>
      </FormSidos>
      <BtnSidos
        onClick={() => {
          form.validateFields()?.then(() => {
            setBase64URLFile(form.getFieldValue("haha"));
          });
        }}
      >
        Get base 64 url
      </BtnSidos>
      <Typography.Text copyable>{base64URLFile}</Typography.Text>
    </Fragment>
  );
};
export default TestPage;

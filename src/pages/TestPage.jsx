import { Form, Input, Select, Typography } from "antd";
import { Fragment, useState } from "react";
import TitlePage from "../components/TitlePage";
import BtnSidos from "../lib/src/components/BtnSidos";
import Field from "../lib/src/components/FormSidos/fields/Field";
import NumberSidos from "../lib/src/components/FormSidos/fields/NumberSidos";
import SelectSidos from "../lib/src/components/FormSidos/fields/SelectSidos";
import UploadSidos from "../lib/src/components/FormSidos/fields/UploadSidos";
import FormSidos from "../lib/src/components/FormSidos/form/FormSidos";
import ImageSidos from "../lib/src/components/ImageSidos";
import PieChartSidos from "../lib/src/components/PieChartSidos";
import getBlob from "../lib/src/helpers/getBlobUrl";

const TestPage = () => {
  const [imageBlob, setImageBlob] = useState(null);

  const handleChange = async ({ file }) => {
    const blobUrl = await getBlob(file?.originFileObj);
    setImageBlob(blobUrl);
  };

  const [form] = Form.useForm();

  return (
    <Fragment>
      <TitlePage title="Test Page" />
      <FormSidos form={form}>
        <Field type="upload" name="haha" label="Upload">
          <BtnSidos type="primary">Upload</BtnSidos>
        </Field>
      </FormSidos>
      <BtnSidos
        onClick={() => {
          console.log(form?.getFieldsValue());
        }}
      >
        Tes
      </BtnSidos>
      <NumberSidos />
    </Fragment>
  );
};
export default TestPage;

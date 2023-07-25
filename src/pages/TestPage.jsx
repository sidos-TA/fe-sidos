import { Form, Input, Select, Typography } from "antd";
import { Fragment, useState } from "react";
import TitlePage from "../components/TitlePage";
import BtnSidos from "../lib/src/components/BtnSidos";
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
      <FormSidos form={form} initialValues={{ label: "Happy cat" }}>
        <SelectSidos
          required
          label="Bidang"
          name="bidang"
          endpoint="getDataBidang"
        />
        <Form.Item name="contoh">
          <Select size="large">
            <Select.Option value={"data1"} label={"data1"} />
          </Select>
        </Form.Item>
        <Form.Item name="label">
          <Input
            style={{
              backgroundColor: "transparent",
              border: "none 0px",
              boxShadow: "none",
              paddingLeft: "0px",
            }}
            readOnly
          />
        </Form.Item>
      </FormSidos>

      <BtnSidos onClick={() => console.log(form?.getFieldsValue())}>
        Test
      </BtnSidos>
    </Fragment>
  );
};
export default TestPage;

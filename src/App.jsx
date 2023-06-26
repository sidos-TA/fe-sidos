import { Form } from "antd";
import FormSidos from "./lib/src/components/FormSidos/form/FormSidos";
import Field from "./lib/src/components/FormSidos/fields";
import TableSidos from "./lib/src/components/TableSidos";

function App() {
  const [form] = Form.useForm();

  const dummyListOptions = Array.from({ length: 50 }, (_, index) => ({
    label: `Data ${index + 1}`,
    value: index + 1,
  }));

  return (
    <>
      <FormSidos form={form}>
        <Field
          type="text"
          name="judul_ta"
          label="Judul TA yang diajukan"
          onChange={(val) => form?.setFieldValue("judul_ta", val)}
        />
        <Field
          type="select"
          name="topik_ta"
          label="Pilih topik TA yang diajukan"
          listOptions={dummyListOptions}
        />
        <Field
          type="switch"
          name="is_fromDosen"
          label="Apakah judul dari dosen"
          checkText="Ya"
          uncheckText="Tidak"
        />
      </FormSidos>
      <TableSidos />
    </>
  );
}

export default App;

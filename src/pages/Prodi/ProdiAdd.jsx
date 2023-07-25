import { Form } from "antd";
import { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import tingkatanProdiList from "../../constants/tingkatanProdiList";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";

const ProdiAdd = () => {
  const [FormProdi] = Form.useForm();
  return (
    <Fragment>
      <TitlePage title="Tambah Prodi" />
      <FormSidos form={FormProdi} submitEndpoint="addProdi">
        <InputSidos name="prodiName" label="Prodi" />
        <SelectSidos
          name="tingkatan"
          label="Tingkatan"
          listOptions={tingkatanProdiList}
        />
      </FormSidos>
    </Fragment>
  );
};
export default ProdiAdd;

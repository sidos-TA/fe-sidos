import { Form } from "antd";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";

const Settings = () => {
  const [FormSettings] = Form.useForm();
  const navigate = useNavigate();

  return (
    <Fragment>
      <TitlePage title="Settings" />
      <FormSidos
        form={FormSettings}
        endpoint="getSetting"
        submitEndpoint="updateSettings"
        afterMessageActionClose={() => {
          navigate("/");
        }}
      >
        <Field
          required
          type="number"
          name="kuota_bimbingan"
          label="Kuota Bimbingan"
        />
        <Field required type="number" name="kGram" label="Jumlah KGram" />
        <Field
          required
          type="number"
          name="maksimal_usulan"
          label="Maksimal Usulan"
          rules={[
            {
              validator: (_, value) => {
                if (value <= 2) {
                  return Promise.reject(
                    new Error(
                      "Mohon berikan lebih dari 2 untuk alternatif para mahasiswa"
                    )
                  );
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        />
      </FormSidos>
    </Fragment>
  );
};
export default Settings;

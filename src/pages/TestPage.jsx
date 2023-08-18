import React, { useState } from "react";
import { Upload, Button, Form, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useFetch from "../lib/src/helpers/useFetch";
import Field from "../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../lib/src/components/FormSidos/form/FormSidos";
import UploadSidos from "../lib/src/components/FormSidos/fields/UploadSidos";
import BtnSidos from "../lib/src/components/BtnSidos";
import getBase64 from "../lib/src/helpers/getBase64";
import { responseSuccess } from "../lib/src/helpers/formatRespons";
import catchHandler from "../lib/src/helpers/catchHandler";

const App = () => {
  const [base64URL, setBase64URL] = useState(false);
  const fetch = useFetch();

  const handleChange = async ({ file }) => {
    const getBase64URL = await getBase64(file);
    setBase64URL(getBase64URL);
  };

  const uploadImageKit = ({ file }) => {
    const formData = new FormData();

    formData.append("file", file);

    fetch({
      endpoint: "uploadFileTest",
      payload: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        console.log(res);
      })
      ?.catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <UploadSidos handleChange={handleChange}>
        <BtnSidos>Get Base 64</BtnSidos>
      </UploadSidos>
      <UploadSidos handleChange={uploadImageKit}>
        <BtnSidos>Tes upload</BtnSidos>
      </UploadSidos>

      {base64URL && (
        <Typography.Paragraph copyable>{base64URL}</Typography.Paragraph>
      )}

      <Field type="textarea" name="tes" label="Tes TextArea" />
    </div>
  );
};

export default App;

import React, { useState } from "react";
import { Upload, Button, Form, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useFetch from "../lib/src/helpers/useFetch";
import Field from "../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../lib/src/components/FormSidos/form/FormSidos";
import UploadSidos from "../lib/src/components/FormSidos/fields/UploadSidos";
import BtnSidos from "../lib/src/components/BtnSidos";
import getBase64 from "../lib/src/helpers/getBase64";

const App = () => {
  const fetch = useFetch();

  const [form] = Form.useForm();
  const [base64URL, setBase64URL] = useState(false);

  const handleChange = async ({ file }) => {
    const getBase64URL = await getBase64(file);
    setBase64URL(getBase64URL);
  };
  return (
    <div>
      <UploadSidos handleChange={handleChange}>
        <BtnSidos>Get Base 64</BtnSidos>
      </UploadSidos>

      {base64URL && (
        <Typography.Paragraph copyable>{base64URL}</Typography.Paragraph>
      )}
    </div>
  );
};

export default App;

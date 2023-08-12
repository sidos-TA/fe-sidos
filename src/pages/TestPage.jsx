import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useFetch from "../lib/src/helpers/useFetch";

const App = () => {
  const fetch = useFetch();

  const handleUpload = ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);

    console.log("formData:", formData?.get("image"));

    fetch({
      endpoint: "uploadImageMhsPhoto",
      payload: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log("res ; ", res);
      })
      .catch((e) => {
        console.log("e : ", e);
      });
  };

  return (
    <div>
      <Upload customRequest={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload File</Button>
      </Upload>
    </div>
  );
};

export default App;

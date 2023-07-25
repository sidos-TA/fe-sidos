import { Fragment } from "react";
import { useTabsContext } from "../../../context/TabsContext";
import BtnSidos from "../../../lib/src/components/BtnSidos";
import UploadSidos from "../../../lib/src/components/FormSidos/fields/UploadSidos";
import TitleSection from "../../TitleSection";
import { read, utils } from "xlsx";
import { Card, Divider, Modal, Space, Typography } from "antd";
import { exampleFileDosen } from "../../../lib/src/constants";
import { useState } from "react";
import ModalPerResult from "./components/ModalPerResult";

const DosenAddUploadFile = () => {
  const { state, setState, FormUpload } = useTabsContext();

  const [modalState, setModalState] = useState({
    data: {},
    visible: false,
  });

  const fileList = [
    {
      uid: "-1",
      name: "Example File Data Dosen.xlsx",
      status: "done",
      url: `${exampleFileDosen}`,
    },
  ];

  const handleChangeHandler = async ({ file }) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = utils.sheet_to_json(worksheet);

      setState((prev) => ({
        ...prev,
        arrDatasFiles: json,
        isShowPreviewUploadFile: true,
      }));
    };
    reader.readAsArrayBuffer(file?.originFileObj);
  };

  return (
    <Fragment>
      <TitleSection title="Upload File" />
      <div style={{ textAlign: "center" }}>
        <Typography.Text>Example File</Typography.Text>
        <UploadSidos
          defaultFileList={fileList}
          showUploadList={{
            showDownloadIcon: true,
            showRemoveIcon: false,
          }}
        />
        <UploadSidos handleChange={handleChangeHandler}>
          <BtnSidos type="dashed">Upload Data</BtnSidos>
        </UploadSidos>
      </div>
      {state?.isShowPreviewUploadFile && (
        <Fragment>
          <Divider orientation="center">Preview</Divider>
          {state?.arrDatasFiles?.length ? (
            <div style={{ textAlign: "center" }}>
              <Space wrap size="large">
                {state?.arrDatasFiles?.map((data, idx) => {
                  return (
                    <Card
                      style={{ cursor: "pointer" }}
                      key={idx}
                      onClick={() => {
                        setModalState((prev) => ({
                          ...prev,
                          data,
                          visible: true,
                        }));
                      }}
                      title={
                        <Typography.Text
                          style={{ width: 100 }}
                          ellipsis={{ tooltip: data?.name }}
                        >
                          {data?.name}
                        </Typography.Text>
                      }
                    >
                      <Typography.Text
                        style={{ width: 100 }}
                        ellipsis={{ tooltip: data?.nip }}
                      >
                        {data?.nip}
                      </Typography.Text>
                    </Card>
                  );
                })}
              </Space>
            </div>
          ) : (
            <Fragment />
          )}
        </Fragment>
      )}
      <ModalPerResult modalState={modalState} setModalState={setModalState} />
    </Fragment>
  );
};

export default DosenAddUploadFile;

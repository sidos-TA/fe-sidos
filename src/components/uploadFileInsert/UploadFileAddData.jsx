import { Fragment } from "react";
import { read, utils } from "xlsx";
import { Card, Divider, message, Popover, Space, Typography } from "antd";
import { useState } from "react";
import ModalPerData from "./ModalPerData";
import TitleSection from "../TitleSection";
import UploadSidos from "../../lib/src/components/FormSidos/fields/UploadSidos";
import BtnSidos from "../../lib/src/components/BtnSidos";
import LoadingSidos from "../../lib/src/components/LoadingSidos";
import useFetch from "../../lib/src/helpers/useFetch";
import { responseSuccess } from "../../lib/src/helpers/formatRespons";
import { useNavigate } from "react-router-dom";
import catchHandler from "../../lib/src/helpers/catchHandler";

const UploadFileAddData = ({
  exampleFile,
  propsCardTitle,
  propsCardSubtitle,
  listOptionsSelectField = {},
  endpointSelectField = {},
  selectLabelSelectField = {},
  selectValueSelectField = {},
  submitEndpoint,
}) => {
  const [state, setState] = useState({
    isShowPreviewUploadFile: false,
    arrDatasFiles: [],
    objDataFileType: {},
    loading: false,
  });

  const [messageApi, contextHolderMessage] = message.useMessage();
  const navigate = useNavigate();

  const [modalState, setModalState] = useState({
    data: {},
    visible: false,
  });

  const fetch = useFetch();

  const handleChangeHandler = async ({ file }) => {
    setState((prev) => ({ ...prev, loading: true }));
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const arrJSONResult = utils.sheet_to_json(worksheet);

      const sheetNameTypes = workbook?.SheetNames[1];
      const worksheetTypes = workbook.Sheets[sheetNameTypes];
      const arrJSONResultTypes = utils.sheet_to_json(worksheetTypes);

      setState((prev) => ({
        ...prev,
        arrDatasFiles: arrJSONResult?.map((data, idx) => ({
          ...data,
          id: idx + 1,
        })),
        objDataFileType: arrJSONResultTypes?.[0],
        isShowPreviewUploadFile: true,
        loading: false,
      }));
    };

    reader.readAsArrayBuffer(file);
  };

  const submitHandler = () => {
    state?.arrDatasFiles?.forEach((data) => {
      delete data["id"];
    });

    setState((prev) => ({ ...prev, loading: true }));

    fetch({
      endpoint: submitEndpoint,
      payload: {
        arrDatas: state?.arrDatasFiles,
      },
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res?.status === 200) {
          messageApi?.open({
            type: "success",
            content: res?.message,
            onClose: () => {
              navigate(`/${location.pathname?.split("/")?.[1]}`);
            },
            duration: 0.3,
          });
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
        setState((prev) => ({ ...prev, loading: true }));
      });
  };

  return (
    <Fragment>
      {contextHolderMessage}
      <TitleSection title="Upload File" />
      <div style={{ textAlign: "center" }}>
        <Typography.Text>Example File</Typography.Text>
        <UploadSidos
          defaultFileList={exampleFile}
          showUploadList={{
            showDownloadIcon: true,
            showRemoveIcon: false,
          }}
        />
        <UploadSidos handleChange={handleChangeHandler}>
          <BtnSidos type="dashed">Upload Data</BtnSidos>
        </UploadSidos>
      </div>

      {state?.loading ? (
        <LoadingSidos style={{ height: "50vh" }} />
      ) : (
        <Fragment>
          {state?.isShowPreviewUploadFile && (
            <Fragment>
              <Divider orientation="center">Preview</Divider>
              {state?.arrDatasFiles?.length ? (
                <div style={{ textAlign: "center" }}>
                  <Space wrap size="large" style={{ justifyContent: "center" }}>
                    {state?.arrDatasFiles?.map((data, idx) => {
                      return (
                        <Popover
                          key={idx}
                          style={{ color: "white" }}
                          content={
                            <Space direction="vertical">
                              {Object.keys(data)
                                ?.filter((dataKey) => dataKey !== "id")
                                ?.map((keyDataFile, idxKeyDataFile) => (
                                  <Typography.Text key={idxKeyDataFile}>
                                    <span style={{ fontWeight: "bold" }}>
                                      {keyDataFile}
                                    </span>{" "}
                                    : {data?.[keyDataFile]}
                                  </Typography.Text>
                                ))}
                            </Space>
                          }
                        >
                          <Card
                            style={{ cursor: "pointer", width: 300 }}
                            key={idx}
                            onClick={() => {
                              setModalState((prev) => ({
                                ...prev,
                                data,
                                visible: true,
                              }));
                            }}
                            title={
                              <Typography.Text style={{ width: 100 }}>
                                {data?.[propsCardTitle]}
                              </Typography.Text>
                            }
                          >
                            {
                              <Typography.Text style={{ width: 100 }}>
                                {data?.[propsCardSubtitle]}
                              </Typography.Text>
                            }
                          </Card>
                        </Popover>
                      );
                    })}
                  </Space>
                </div>
              ) : (
                <Fragment />
              )}
            </Fragment>
          )}
        </Fragment>
      )}

      {state?.arrDatasFiles?.length ? (
        <BtnSidos
          loading={state?.loading}
          disabled={state?.loading}
          type="primary"
          position="center"
          onClick={() => submitHandler()}
        >
          Submit
        </BtnSidos>
      ) : (
        <Fragment />
      )}

      <ModalPerData
        state={state}
        setState={setState}
        modalState={modalState}
        setModalState={setModalState}
        listOptionsSelectField={listOptionsSelectField}
        endpointSelectField={endpointSelectField}
        selectLabelSelectField={selectLabelSelectField}
        selectValueSelectField={selectValueSelectField}
      />
    </Fragment>
  );
};

export default UploadFileAddData;

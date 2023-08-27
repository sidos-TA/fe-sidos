import { Fragment } from "react";
import { read, utils } from "xlsx";
import {
  Badge,
  Card,
  Divider,
  message,
  Popover,
  Space,
  Typography,
} from "antd";
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
import CardResult from "./CardResult";
import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import ModalAddData from "./ModalAddData";

const UploadFileAddData = ({
  exampleFile,
  propsCardTitle,
  propsCardSubtitle,
  listOptionsSelectField = {},
  endpointSelectField = {},
  selectLabelSelectField = {},
  selectValueSelectField = {},
  submitEndpoint,
  pKey,
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

  const [openModalAdd, setOpenModalAdd] = useState(false);

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

  const deleteEachResult = (id) => {
    const newDatas = state?.arrDatasFiles?.filter((data) => data?.id !== id);

    setState((prev) => ({
      ...prev,
      arrDatasFiles: newDatas,
    }));
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
              <div style={{ textAlign: "center" }}>
                <Space wrap size="large" style={{ justifyContent: "center" }}>
                  {state?.arrDatasFiles?.length ? (
                    <Fragment>
                      {state?.arrDatasFiles?.map((data, idx) => {
                        return (
                          <Badge
                            key={idx}
                            count={
                              <CloseCircleFilled
                                style={{
                                  fontSize: 32,
                                  color: "red",
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteEachResult(data?.id)}
                              />
                            }
                          >
                            <CardResult
                              data={data}
                              propsCardSubtitle={propsCardSubtitle}
                              propsCardTitle={propsCardTitle}
                              setModalState={setModalState}
                            />
                          </Badge>
                        );
                      })}
                    </Fragment>
                  ) : (
                    <Fragment />
                  )}

                  <Card
                    style={{ cursor: "pointer", border: "1px dashed #c1c1c1" }}
                    onClick={() => setOpenModalAdd(true)}
                  >
                    <Space>
                      <PlusOutlined />
                      <Typography.Text>Tambah</Typography.Text>
                    </Space>
                  </Card>
                </Space>
              </div>
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
        pKey={pKey}
      />

      <ModalAddData
        openModalAdd={openModalAdd}
        setOpenModalAdd={setOpenModalAdd}
        state={state}
        setState={setState}
        listOptionsSelectField={listOptionsSelectField}
        endpointSelectField={endpointSelectField}
        selectLabelSelectField={selectLabelSelectField}
        selectValueSelectField={selectValueSelectField}
        pKey={pKey}
      />
    </Fragment>
  );
};

export default UploadFileAddData;

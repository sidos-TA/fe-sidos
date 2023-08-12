import { Col, Form, message, Row, Space } from "antd";
import { lazy, Suspense, useCallback, useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import DosenDetailProfileContext from "../../../../context/Dosen/DosenDetail/DosenDetailProfileContext";
import { useTabsContext } from "../../../../context/TabsContext";
import BtnSidos from "../../../../lib/src/components/BtnSidos";
import Field from "../../../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../../../lib/src/components/FormSidos/form/FormSidos";
import ImageSidos from "../../../../lib/src/components/ImageSidos";
import LoadingSidos from "../../../../lib/src/components/LoadingSidos";
import decodeBlob from "../../../../lib/src/helpers/decodeBlob";
import getBase64 from "../../../../lib/src/helpers/getBase64";
import isStringParseArray from "../../../../lib/src/helpers/isStringParseArray";
import TitleSection from "../../../TitleSection";

const DosenDetailProfileField = lazy(() => import("./DosenDetailProfileField"));
const DosenDetailProfileModalBidang = lazy(() =>
  import("./DosenDetailProfileModalBidang")
);
const DosenDetailProfileModalPassword = lazy(() =>
  import("./DosenDetailProfileModalPassword")
);

const DosenDetailProfile = () => {
  const { state: stateTabs } = useTabsContext();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [state, setState] = useState({
    profileIdentity: {},
    previewImg: "",
    isImgSizeValid: true,
    isVisibleModalPassword: false,
    isVisibleModalBidang: false,
  });

  const updateField = ({ field, val }) => {
    setState((prev) => ({
      ...prev,
      profileIdentity: {
        ...state?.profileIdentity,
        [field]: val,
      },
    }));
  };

  const deleteHandler = useCallback(() => {
    setState((prev) => ({
      ...prev,
      previewImg: "",
      isImgSizeValid: true,
    }));
  }, [state.previewImg]);

  const handleChange = async ({ file }) => {
    const base64Url = await getBase64(file);
    const is200KB = file.size / 1024 < 200;

    if (is200KB) {
      setState((prev) => ({
        ...prev,
        previewImg: base64Url,
        isImgSizeValid: true,
      }));
    } else {
      messageApi?.open({
        key: "larger_than_200kb",
        type: "error",
        content: "Gambar tidak boleh lebih dari 200KB",
        duration: 1.2,
      });
      setState((prev) => ({
        ...prev,
        previewImg: base64Url,
        isImgSizeValid: false,
      }));
    }
  };

  const toggleModalDosenDetailProfile = useCallback(
    ({ visible, state }) => {
      setState((prev) => ({
        ...prev,
        [state]: visible,
      }));
    },
    [state.isVisibleModalPassword, state?.isVisibleModalBidang]
  );

  const defaultValDataBidang = (dataBidang) => {
    if (isStringParseArray(dataBidang)) {
      return JSON.parse(dataBidang || "[]");
    } else if (Array.isArray(dataBidang)) {
      return dataBidang;
    }
  };

  return (
    <Fragment>
      {contextHolder}
      <TitleSection title="Profile" />

      <DosenDetailProfileContext.Provider
        value={{
          state,
          form,
          stateTabs,
          setState,
          updateField,
          deleteHandler,
          toggleModalDosenDetailProfile,
          defaultValDataBidang,
        }}
      >
        <FormSidos
          form={form}
          submitEndpoint="updateDataDosen"
          submitText="Perbarui"
          BtnSubmitProps={{
            disabled: !state?.isImgSizeValid,
          }}
          deleteEndpoint="deleteDataDosen"
          payloadDelete={{
            nip: stateTabs?.datas?.nip,
          }}
          payloadFetch={{
            nip: stateTabs?.datas?.nip,
            name: state?.profileIdentity?.name || stateTabs?.datas?.name,
            sks: state?.profileIdentity?.sks || stateTabs?.datas?.sks,
            prodi: state?.profileIdentity?.prodi || stateTabs?.datas?.prodi,
            jabatan:
              state?.profileIdentity?.jabatan || stateTabs?.datas?.jabatan,
            pendidikan:
              state?.profileIdentity?.pendidikan ||
              stateTabs?.datas?.pendidikan,
            bidang: state?.profileIdentity?.bidang || stateTabs?.datas?.bidang,
            photo: state?.previewImg || stateTabs?.datas?.photo,
          }}
          payloadSubmit={{
            nip: stateTabs?.datas?.nip,
            name: state?.profileIdentity?.name || stateTabs?.datas?.name,
            sks: state?.profileIdentity?.sks || stateTabs?.datas?.sks,
            prodi: state?.profileIdentity?.prodi || stateTabs?.datas?.prodi,
            jabatan:
              state?.profileIdentity?.jabatan || stateTabs?.datas?.jabatan,
            pendidikan:
              state?.profileIdentity?.pendidikan ||
              stateTabs?.datas?.pendidikan,
            bidang: state?.profileIdentity?.bidang || stateTabs?.datas?.bidang,
            photo: state?.previewImg || stateTabs?.datas?.photo,
          }}
          afterMessageActionClose={() => {
            const pathnameLocation =
              window?.location?.pathname?.split("/")?.[1];

            if (pathnameLocation === "dosen_prfl") {
              window.location.href = "/";
            } else {
              navigate("/dosen");
            }
          }}
        >
          <Row justify="space-around" align="middle">
            <Col>
              <Suspense fallback={<LoadingSidos />}>
                <DosenDetailProfileField />
              </Suspense>
            </Col>
            <Col>
              <Space
                direction="vertical"
                size="small"
                style={{ textAlign: "center" }}
              >
                <ImageSidos
                  src={state?.previewImg || decodeBlob(stateTabs?.datas?.photo)}
                />
                <Space>
                  <Field
                    type="upload"
                    handleChange={handleChange}
                    showUploadList={false}
                    isImage
                    isManualSize
                  >
                    <BtnSidos>Upload</BtnSidos>
                  </Field>
                  {state?.previewImg && (
                    <BtnSidos danger type="dashed" onClick={deleteHandler}>
                      Delete
                    </BtnSidos>
                  )}
                </Space>
              </Space>
            </Col>
          </Row>
        </FormSidos>
        <DosenDetailProfileModalBidang />
        <DosenDetailProfileModalPassword />
      </DosenDetailProfileContext.Provider>
    </Fragment>
  );
};

export default DosenDetailProfile;

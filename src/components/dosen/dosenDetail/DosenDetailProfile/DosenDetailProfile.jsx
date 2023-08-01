import { Col, Form, message, Modal, Row, Space } from "antd";
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
import TitleSection from "../../../TitleSection";

const DosenDetailProfileField = lazy(() => import("./DosenDetailProfileField"));
const DosenDetailProfileModal = lazy(() => import("./DosenDetailProfileModal"));

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

  const toggleModalPassword = useCallback(
    (visible) => {
      setState((prev) => ({
        ...prev,
        isVisibleModalPassword: visible,
      }));
    },
    [state.isVisibleModalPassword]
  );

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
          toggleModalPassword,
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
          payload={{
            nip: stateTabs?.datas?.nip,
            name: state?.profileIdentity?.name || stateTabs?.datas?.name,
            sks: state?.profileIdentity?.sks || stateTabs?.datas?.sks,
            prodi: state?.profileIdentity?.prodi || stateTabs?.datas?.prodi,
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
        <DosenDetailProfileModal />
      </DosenDetailProfileContext.Provider>
    </Fragment>
  );
};

export default DosenDetailProfile;

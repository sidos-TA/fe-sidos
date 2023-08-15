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
import { responseSuccess } from "../../../../lib/src/helpers/formatRespons";
import getBase64 from "../../../../lib/src/helpers/getBase64";
import useFetch from "../../../../lib/src/helpers/useFetch";
import TitleSection from "../../../TitleSection";

const DosenDetailProfileField = lazy(() => import("./DosenDetailProfileField"));
const DosenDetailProfileModalBidang = lazy(() =>
  import("./DosenDetailProfileModalBidang")
);
const DosenDetailProfileModalPassword = lazy(() =>
  import("./DosenDetailProfileModalPassword")
);

const DosenDetailProfile = () => {
  const { state: stateTabs, setState: setStateTabs } = useTabsContext();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetch = useFetch();

  const [state, setState] = useState({
    profileIdentity: {},
    previewImg: "",
    isVisibleModalPassword: false,
    isVisibleModalBidang: false,
    filePhoto: {},
  });

  const payloadFetchSubmit = {
    nip: stateTabs?.datas?.nip,
    name: state?.profileIdentity?.name || stateTabs?.datas?.name,
    sks: state?.profileIdentity?.sks || stateTabs?.datas?.sks,
    prodi: state?.profileIdentity?.prodi || stateTabs?.datas?.prodi,
    jabatan: state?.profileIdentity?.jabatan || stateTabs?.datas?.jabatan,
    pendidikan:
      state?.profileIdentity?.pendidikan || stateTabs?.datas?.pendidikan,
    bidang: state?.profileIdentity?.bidangs || stateTabs?.datas?.bidangs,
    photo: state?.previewImg || stateTabs?.datas?.photo,
  };

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
    }));
  }, [state.previewImg]);

  const handleChange = async ({ file }) => {
    const base64Url = await getBase64(file);

    setState((prev) => ({
      ...prev,
      filePhoto: file,
      previewImg: base64Url,
    }));
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

  const uploadToCloudinary = ({ jabatan }) => {
    const formData = new FormData();
    formData.append("image", state?.filePhoto);
    formData.append("jabatan", jabatan);
    formData.append("nip", stateTabs?.datas?.nip);

    fetch({
      endpoint: "uploadImageDsnPhoto",
      payload: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })?.then((response) => {
      const res = responseSuccess(response);
      if (res.status === 200) {
        setStateTabs((prev) => ({
          ...prev,
          datas: {
            ...stateTabs?.datas,
            photo: res?.data,
          },
        }));
      }
    });
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
        }}
      >
        <FormSidos
          form={form}
          submitEndpoint="updateDataDosen"
          submitText="Perbarui"
          deleteEndpoint="deleteDataDosen"
          payloadDelete={{
            nip: stateTabs?.datas?.nip,
          }}
          payloadFetch={payloadFetchSubmit}
          payloadSubmit={payloadFetchSubmit}
          afterMessageActionClose={(formData) => {
            const pathnameLocation =
              window?.location?.pathname?.split("/")?.[1];
            uploadToCloudinary({ jabatan: formData?.data?.jabatan });

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
                  src={state?.previewImg || stateTabs?.datas?.photo}
                />
                <Space>
                  <Field
                    type="upload"
                    handleChange={handleChange}
                    showUploadList={false}
                    isImage
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

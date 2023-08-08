import { Col, Form, message, Row, Space } from "antd";
import { Fragment, useState } from "react";
import BtnSidos from "../../../lib/src/components/BtnSidos";
import TitleSection from "../../TitleSection";
import { useTabsContext } from "../../../context/TabsContext";
import ImageSidos from "../../../lib/src/components/ImageSidos";
import LabelSidos from "../../../lib/src/components/FormSidos/fields/LabelSidos";
import FormSidos from "../../../lib/src/components/FormSidos/form/FormSidos";
import getBase64 from "../../../lib/src/helpers/getBase64";
import decodeBlob from "../../../lib/src/helpers/decodeBlob";
import Field from "../../../lib/src/components/FormSidos/fields/Field";
import decodeCookie from "../../../lib/src/helpers/decodeCookie";
import { useNavigate } from "react-router-dom";
import semesterList from "../../../constants/semesterList";

const MahasiswaDetailProfile = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const dataCookie = decodeCookie("token");
  const navigate = useNavigate();

  const { state: stateData } = useTabsContext();
  const [state, setState] = useState({
    previewImg: "",
    profileIdentity: {},
    isImgSizeValid: true,
  });

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
      });
      setState((prev) => ({
        ...prev,
        previewImg: base64Url,
        isImgSizeValid: false,
      }));
    }
  };

  const deleteHandler = () => {
    setState((prev) => ({
      ...prev,
      previewImg: "",
    }));
  };

  return (
    <Fragment>
      {contextHolder}
      <TitleSection title="Profil" />
      <FormSidos
        form={form}
        {...(dataCookie?.roles === 1 && {
          deleteEndpoint: "deleteDataMhs",
          payloadDelete: {
            no_bp: stateData?.datas?.no_bp,
          },
        })}
        payloadFetch={stateData}
        payloadSubmit={{
          no_bp: stateData?.datas?.no_bp,
          name: state?.profileIdentity?.name || stateData?.datas?.name,
          prodi: state?.profileIdentity?.prodi || stateData?.datas?.prodi,
          photo: state?.previewImg || stateData?.datas?.photo,
          semester:
            state?.profileIdentity?.semester || stateData?.datas?.semester,
          tahun: state?.profileIdentity?.tahun || stateData?.datas?.tahun,
        }}
        afterMessageActionClose={() => {
          if (dataCookie?.roles === 2) {
            window.location.href = "/";
          } else {
            navigate("/mahasiswa");
          }
        }}
        BtnSubmitProps={{
          disabled: !state?.isImgSizeValid,
        }}
        showSubmitBtn
        submitEndpoint="updateDataMhs"
        submitText="Perbarui"
      >
        <Row justify="space-around" align="middle">
          <Col>
            <Space direction="vertical" size={32}>
              <LabelSidos
                label="No. Bp"
                type="text"
                defaultValue={stateData?.datas?.no_bp}
              >
                {stateData?.datas?.no_bp}
              </LabelSidos>
              <LabelSidos
                isEditable
                label="Nama Mahasiswa"
                type="text"
                defaultValue={
                  state?.profileIdentity?.name || stateData?.datas?.name
                }
                onChange={(val) => {
                  setState((prev) => ({
                    ...prev,
                    profileIdentity: {
                      ...state?.profileIdentity,
                      name: val,
                    },
                  }));
                }}
              >
                {state?.profileIdentity?.name || stateData?.datas?.name}
              </LabelSidos>

              <LabelSidos
                defaultValue={
                  state?.profileIdentity?.prodi || stateData?.datas?.prodi
                }
                onChange={(val) => {
                  setState((prev) => ({
                    ...prev,
                    profileIdentity: {
                      ...state?.profileIdentity,
                      prodi: val,
                    },
                  }));
                }}
                type="select"
                isEditable
                label="Prodi"
                endpoint="getAllProdi"
                selectLabel="prodiName"
                selectValue="prodiName"
              >
                {state?.profileIdentity?.prodi || stateData?.datas?.prodi}
              </LabelSidos>

              <LabelSidos
                defaultValue={
                  state?.profileIdentity?.semester || stateData?.datas?.semester
                }
                onChange={(val) => {
                  setState((prev) => ({
                    ...prev,
                    profileIdentity: {
                      ...state?.profileIdentity,
                      semester: val,
                    },
                  }));
                }}
                type="select"
                isEditable
                name="semester"
                label="Semester"
                listOptions={semesterList}
              >
                {state?.profileIdentity?.semester || stateData?.datas?.semester}
              </LabelSidos>

              <LabelSidos
                defaultValue={
                  state?.profileIdentity?.tahun || stateData?.datas?.tahun
                }
                onChange={(val) => {
                  setState((prev) => ({
                    ...prev,
                    profileIdentity: {
                      ...state?.profileIdentity,
                      tahun: val,
                    },
                  }));
                }}
                type="select"
                endpoint="getTahun"
              selectValue="tahun"
              selectLabel="tahun"
                name="tahun"
                isEditable
                label="Tahun"
              >
                {state?.profileIdentity?.tahun || stateData?.datas?.tahun}
              </LabelSidos>
            </Space>
          </Col>
          <Col>
            <Space
              direction="vertical"
              size="small"
              style={{ textAlign: "center" }}
            >
              <ImageSidos
                src={state?.previewImg || decodeBlob(stateData?.datas?.photo)}
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
    </Fragment>
  );
};

export default MahasiswaDetailProfile;

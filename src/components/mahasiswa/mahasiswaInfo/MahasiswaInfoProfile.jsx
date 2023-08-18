import { Col, Form, message, Row, Space } from "antd";
import { Fragment, useState } from "react";
import BtnSidos from "../../../lib/src/components/BtnSidos";
import TitleSection from "../../TitleSection";
import { useTabsContext } from "../../../context/TabsContext";
import ImageSidos from "../../../lib/src/components/ImageSidos";
import LabelSidos from "../../../lib/src/components/FormSidos/fields/LabelSidos";
import FormSidos from "../../../lib/src/components/FormSidos/form/FormSidos";
import getBase64 from "../../../lib/src/helpers/getBase64";
import Field from "../../../lib/src/components/FormSidos/fields/Field";
import decodeCookie from "../../../lib/src/helpers/decodeCookie";
import { useNavigate } from "react-router-dom";
import semesterList from "../../../constants/semesterList";
import { responseSuccess } from "../../../lib/src/helpers/formatRespons";
import useFetch from "../../../lib/src/helpers/useFetch";
import catchHandler from "../../../lib/src/helpers/catchHandler";

const MahasiswaDetailProfile = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const dataCookie = decodeCookie("token");
  const navigate = useNavigate();
  const fetch = useFetch();

  const { state: stateData, setState: setStateData } = useTabsContext();

  const [state, setState] = useState({
    previewImg: "",
    profileIdentity: {},
    filePhoto: {},
  });

  const handleChange = async ({ file }) => {
    const base64Url = await getBase64(file);

    setState((prev) => ({
      ...prev,
      previewImg: base64Url,
      filePhoto: file,
    }));
  };

  const deleteHandler = () => {
    setState((prev) => ({
      ...prev,
      previewImg: "",
    }));
  };

  const uploadToCloudinary = ({ prodi }) => {
    const formData = new FormData();
    formData.append("image", state?.filePhoto);
    formData.append("prodi", prodi);
    formData.append("no_bp", stateData?.datas?.no_bp);

    fetch({
      endpoint: "uploadImageMhsPhoto",
      payload: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res.status === 200) {
          setStateData((prev) => ({
            ...prev,
            datas: {
              ...stateData?.datas,
              photo: res?.data,
            },
          }));
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      });
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
        beforeSubmit={() => {
          uploadToCloudinary({
            prodi: state?.profileIdentity?.prodi || stateData?.datas?.prodi,
          });
        }}
        afterMessageActionClose={() => {
          if (dataCookie?.roles === 2) {
            window.location.href = "/";
          } else {
            navigate("/mahasiswa");
          }
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
              <ImageSidos src={state?.previewImg || stateData?.datas?.photo} />
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
    </Fragment>
  );
};

export default MahasiswaDetailProfile;

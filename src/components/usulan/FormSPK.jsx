import { FileOutlined } from "@ant-design/icons";
import { Col, message, Row } from "antd";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsulanFormContext } from "../../context/Usulan/UsulanFormContext";
import BtnSidos from "../../lib/src/components/BtnSidos";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import LabelSidos from "../../lib/src/components/FormSidos/fields/LabelSidos";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import catchHandler from "../../lib/src/helpers/catchHandler";
import decodeCookie from "../../lib/src/helpers/decodeCookie";
import { responseSuccess } from "../../lib/src/helpers/formatRespons";
import isIncludeEmot from "../../lib/src/helpers/isIncludeEmot";
import useFetch from "../../lib/src/helpers/useFetch";

const FormSPK = ({
  isFromKeputusan = false,
  stateSimilar,
  getSimilarHandler,
  isFromDosen = false,
  ...props
}) => {
  const { form, state, setState, type, loadingUpload, setLoadingUpload } =
    useUsulanFormContext();
  const dataCookie = decodeCookie("token");

  const [linkPDF, setLinkPDF] = useState({
    original_filename: "",
    secure_url: "",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const fetch = useFetch();

  const beforeUpload = (file) => {
    setLoadingUpload(true);
    setLinkPDF((prev) => ({
      ...prev,
      secure_url: "#",
    }));
    const formData = new FormData();

    formData.append("pra_proposal", file);
    formData.append("semester", state?.settings?.semester);
    formData.append("tahun", state?.settings?.tahun);
    formData.append("prodi", dataCookie?.prodi);
    formData.append("judul", form.getFieldValue("judul"));
    formData.append("no_bp", dataCookie?.no_bp);

    fetch({
      endpoint: "uploadFilePraProposal",
      payload: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res.status === 200) {
          setLinkPDF((prev) => ({
            ...prev,
            original_filename: res?.data?.original_filename,
            secure_url: res?.data?.secure_url,
          }));
          form.setFieldValue("file_pra_proposal", res?.data?.secure_url);
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      })
      ?.finally(() => {
        setLoadingUpload(false);
      });
  };

  return (
    <Fragment>
      {contextHolder}
      <FormSidos
        form={form}
        initialValues={{
          isJdlFromDosen: "tidak",
          jdl_from_dosen: "",
        }}
        {...props}
      >
        {type === "edit" && (
          <LabelSidos label="Nama Mahasiswa">{state?.mhsName}</LabelSidos>
        )}
        <Row gutter={16} align="middle">
          <Col span={19}>
            {type === "edit" ? (
              <LabelSidos
                labelProps={{
                  copyable: true,
                }}
                defaultValue={form?.getFieldValue("judul")}
                label="Judul"
              >
                {form?.getFieldValue("judul")}
              </LabelSidos>
            ) : (
              <Field
                type="textarea"
                required
                label="Judul"
                name="judul"
                rules={[
                  {
                    validator: (_, value) => {
                      if (value?.trim()?.length <= state?.settings?.kGram) {
                        return Promise.reject(
                          new Error(
                            `Minimal harus mempunyai ${state?.settings?.kGram} karakter`
                          )
                        );
                      } else if (isIncludeEmot(value)) {
                        return Promise.reject(
                          new Error(
                            "Judul mengandung emotikon, mohon diperbaiki"
                          )
                        );
                      } else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              />
            )}
          </Col>
          <Col span={2}>
            <BtnSidos
              type="dashed"
              loading={stateSimilar?.isLoadingGetSimilar}
              disabled={stateSimilar?.isLoadingGetSimilar}
              onClick={() => {
                getSimilarHandler();
              }}
            >
              Cek Similaritas Judul
            </BtnSidos>
          </Col>
        </Row>

        {type === "edit" ? (
          <LabelSidos
            defaultValue={form?.getFieldValue("bidang")}
            label="Bidang"
            labelProps={{
              copyable: true,
            }}
          >
            {form?.getFieldValue("bidang")}
          </LabelSidos>
        ) : (
          <Field
            type="select"
            required
            label="Bidang"
            name="bidang"
            endpoint="getDataBidang"
            selectLabel="bidang"
            selectValue="bidang"
          />
        )}

        {Object.keys(dataCookie)?.length ? (
          <Fragment>
            {type === "edit" ? (
              <Row>
                <Col span={24}>
                  <LabelSidos
                    label="Judul dari dosen"
                    style={{
                      display: "block",
                    }}
                  >
                    {state?.dsnNameJdlFromDosen || "Tidak dari dosen manapun"}
                  </LabelSidos>
                </Col>
              </Row>
            ) : (
              <Fragment>
                {!isFromKeputusan && (
                  <Field
                    type="radio"
                    label="Apakah Judul Dari Dosen"
                    name="isJdlFromDosen"
                    listOptions={[
                      {
                        label: "Ya",
                        value: "ya",
                      },
                      {
                        label: "Tidak",
                        value: "tidak",
                      },
                    ]}
                    onChange={(value) => {
                      setState({
                        ...state,
                        isJdlFromDosen: value,
                      });
                    }}
                  />
                )}

                {isFromDosen && (
                  <Field
                    label="Nama Dosen"
                    name="jdl_from_dosen"
                    type="select"
                    endpoint="getAllDosen"
                    selectLabel="name"
                    selectValue="nip"
                    required
                    payload={{
                      usePaginate: false,
                    }}
                  />
                )}
              </Fragment>
            )}

            {!isFromKeputusan && (
              <Fragment>
                {type === "edit" ? (
                  <Row gutter={8} align="middle">
                    <Col>
                      <FileOutlined />
                    </Col>
                    <Col>
                      <LabelSidos
                        label="File Pra Proposal"
                        isLink
                        labelProps={{
                          href: form?.getFieldValue("file_pra_proposal"),
                          target: "_blank",
                        }}
                      >
                        {`${state?.mhsName} - File Pra Proposal.pdf`}
                      </LabelSidos>
                    </Col>
                  </Row>
                ) : (
                  <Field
                    required={
                      state?.arrUsulanDospem?.length ===
                      state?.settings?.maksimal_usulan
                    }
                    label="File pra-proposal"
                    name="file_pra_proposal"
                    type="upload"
                    beforeUpload={(file) => {
                      beforeUpload(file);
                      return false;
                    }}
                    showUploadList={{
                      showDownloadIcon: type === "edit",
                      showRemoveIcon: type !== "edit",
                    }}
                    {...(linkPDF?.secure_url && {
                      fileList: [
                        {
                          name: `${
                            loadingUpload
                              ? "Sedang upload, mohon ditunggu"
                              : `${linkPDF?.original_filename}.pdf`
                          }`,
                          status: loadingUpload ? "uploading" : "done",
                          url: linkPDF?.secure_url,
                        },
                      ],
                    })}
                    accept=".pdf"
                  >
                    <BtnSidos>Upload</BtnSidos>
                  </Field>
                )}
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Fragment />
        )}
      </FormSidos>
    </Fragment>
  );
};
export default FormSPK;

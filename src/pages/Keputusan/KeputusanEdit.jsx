import { Divider, Form, Space } from "antd";
import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BimbinganComponent from "../../components/BimbinganComponent";
import TitlePage from "../../components/TitlePage";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import noDospemIllustrate from "../../assets/noDospem.svg";
import decodeCookie from "../../lib/src/helpers/decodeCookie";
import LabelSidos from "../../lib/src/components/FormSidos/fields/LabelSidos";
import TagSidos from "../../lib/src/components/TagSidos";
import colorTagHandler from "../../lib/src/helpers/colorTagHandler";
import { useEffect } from "react";

const KeputusanEdit = () => {
  const [FormKeputusan] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();

  const [state, setState] = useState({
    arrDatasDospem: [],
    tingkatan: "",
    statusJudul: "",
    keterangan: "",
    no_bp: "",
    prodi: "",
  });

  const dataCookie = decodeCookie("token");

  useEffect(() => {
    if (
      state?.no_bp &&
      dataCookie?.roles === 2 &&
      dataCookie?.no_bp !== state?.no_bp
    ) {
      navigate("/unauth");
    }
  }, [state?.no_bp]);

  return (
    <Fragment>
      <TitlePage title="Detail Keputusan" backRoute="/keputusan" />
      {dataCookie?.roles === 2 && (
        <LabelSidos
          position="center"
          style={{ textAlign: "center" }}
          label="Status Judul : "
        >
          <TagSidos color={colorTagHandler(state?.statusJudul)}>
            {state?.statusJudul}
          </TagSidos>
        </LabelSidos>
      )}
      <FormSidos
        form={FormKeputusan}
        payloadSubmit={{
          id_usulan: params?.id_usulan,
          no_bp: state?.no_bp,
          nip: state?.arrDatasDospem?.map((data) => data?.nip),
          tingkatan: state?.prodi?.split("-")?.[0]?.trim(),
          ...FormKeputusan?.getFieldsValue(true),
        }}
        payloadFetch={{
          id_usulan: params?.id_usulan,
          ...(dataCookie?.roles === 1 && {
            status_judul: "usulan",
          }),
        }}
        endpoint="getDetailKeputusan"
        {...(dataCookie?.roles === 1 && {
          submitEndpoint: "addBimbingan",
        })}
        customFetch={(formData) => {
          FormKeputusan.setFieldsValue(formData);
          // FormKeputusan?.setFieldsValue({
          //   jdl_from_dosen: formData?.jdl_from_dosen,
          //   judul: formData?.judul,
          //   bidang: formData?.bidang,
          //   file_pra_proposal:formData?.file_pra_proposal
          // });

          const arrDatasDospem = formData?.usulans?.map((usul) => usul?.dosen);
          setState((prev) => ({
            ...prev,
            arrDatasDospem,
            no_bp: formData?.no_bp,
            prodi: formData?.prodi,
            keterangan: formData?.keterangan,
            ...(dataCookie?.roles === 2 &&
              formData?.status_judul && {
                statusJudul: formData?.status_judul,
              }),
          }));
        }}
        {...(dataCookie?.roles === 1 && {
          afterMessageActionClose: () => {
            navigate("/bimbingan");
          },
        })}
      >
        <Space direction="vertical">
          <LabelSidos name="judul" label="Judul">
            {FormKeputusan?.getFieldValue("judul")}
          </LabelSidos>
          <LabelSidos name="bidang" label="Bidang">
            {FormKeputusan?.getFieldValue("bidang")}
          </LabelSidos>
          <LabelSidos name="jdl_from_dosen" label="Judul dari Dosen">
            {FormKeputusan?.getFieldValue("jdl_from_dosen") ||
              "Tidak dari dosen manapun"}
          </LabelSidos>
          <LabelSidos
            name="file_pra_proposal"
            isLink
            label="File Pra Proposal"
            labelProps={{
              href: FormKeputusan.getFieldValue("file_pra_proposal"),
              target: "_blank",
            }}
          >{`${state?.no_bp}_${FormKeputusan?.getFieldValue(
            "judul"
          )}.pdf`}</LabelSidos>
        </Space>

        <Divider orientation="center">Dosen Pembimbing</Divider>
        <BimbinganComponent
          arrDatasBimbingan={state?.arrDatasDospem}
          src={noDospemIllustrate}
          badgeText="Dosen Pembimbing"
          propMainInfo="name"
          propSubInfo="pendidikan"
          propBody="jabatan"
          textNoData="Belum ada dosen pembimbing"
        />

        {dataCookie?.roles === 1 && (
          <Fragment>
            <Field
              type="radio"
              required
              label="Status Judul"
              name="status_judul"
              onChange={(val) => {
                setState((prev) => ({ ...prev, statusJudul: val }));
              }}
              listOptions={[
                {
                  label: "Terima",
                  value: "terima",
                },
                {
                  label: "Tolak",
                  value: "tolak",
                },
                {
                  label: "Revisi",
                  value: "revisi",
                },
              ]}
            />

            {state?.statusJudul && (
              <Field
                required={
                  state?.statusJudul === "tolak" ||
                  state?.statusJudul === "revisi"
                }
                type="textarea"
                name="keterangan"
                label={`Keterangan - ${state?.statusJudul}`}
              />
            )}
          </Fragment>
        )}

        {dataCookie?.roles === 2 && (
          <LabelSidos label="Keterangan : ">
            {state?.keterangan || "Tidak ada keterangan"}
          </LabelSidos>
        )}
      </FormSidos>
    </Fragment>
  );
};
export default KeputusanEdit;

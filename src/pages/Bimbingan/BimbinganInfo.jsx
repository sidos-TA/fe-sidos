import { Divider, Form, Space, Typography } from "antd";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import BimbinganComponent from "../../components/BimbinganComponent";
import TitlePage from "../../components/TitlePage";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import noDospemIllustrate from "../../assets/noDospem.svg";
import LabelSidos from "../../lib/src/components/FormSidos/fields/LabelSidos";
import TagSidos from "../../lib/src/components/TagSidos";
import colorTagHandler from "../../lib/src/helpers/colorTagHandler";
import ImageSidos from "../../lib/src/components/ImageSidos";

const BimbinganInfo = () => {
  const [FormKeputusan] = Form.useForm();
  const params = useParams();

  const [state, setState] = useState({
    arrDatasDospem: [],
    tingkatan: "",
    statusJudul: "",
    keterangan: "",
    mhs_profile: {},
  });

  return (
    <Fragment>
      <TitlePage title="Detail Bimbingan" backRoute="/bimbingan" />

      <Space
        style={{ textAlign: "center", width: "100%", marginBottom: 50 }}
        direction="vertical"
      >
        <ImageSidos src={state?.mhs_profile?.photo} />
        <Typography.Text strong>{state?.mhs_profile?.name}</Typography.Text>
        <Typography.Text strong>{state?.mhs_profile?.no_bp}</Typography.Text>
        <Typography.Text strong>{state?.mhs_profile?.prodi}</Typography.Text>
      </Space>

      <LabelSidos
        position="center"
        style={{ textAlign: "center" }}
        label="Status Judul : "
      >
        <TagSidos color={colorTagHandler(state?.statusJudul)}>
          {state?.statusJudul}
        </TagSidos>
      </LabelSidos>

      <FormSidos
        form={FormKeputusan}
        payloadFetch={{
          id_usulan: params?.id_usulan,
        }}
        endpoint="getDetailKeputusan"
        customFetch={(formData) => {
          FormKeputusan?.setFieldsValue({
            jdl_from_dosen: formData?.jdl_from_dosen,
            judul: formData?.judul,
            bidang: formData?.bidang,
            file_pra_proposal: formData?.file_pra_proposal,
          });

          const arrDatasDospem = formData?.usulans?.map((usul) => usul?.dosen);
          setState((prev) => ({
            ...prev,
            arrDatasDospem,
            keterangan: formData?.keterangan,
            statusJudul: formData?.status_judul,
            mhs_name: formData?.name,
            mhs_profile: {
              name: formData?.name,
              photo: formData?.photo,
              prodi: formData?.prodi,
              no_bp: formData?.no_bp,
            },
            photo: formData?.photo,
          }));
        }}
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
            labelProps={{
              href: FormKeputusan?.getFieldValue("file_pra_proposal"),
              target: "_blank",
            }}
            label="File Pra Proposal"
          >
            {`${state?.mhs_profile?.name} - File Pra Proposal.pdf`}
          </LabelSidos>
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

        <LabelSidos label="Keterangan : ">
          {state?.keterangan || "Tidak ada catatan tambahan"}
        </LabelSidos>
      </FormSidos>
    </Fragment>
  );
};
export default BimbinganInfo;

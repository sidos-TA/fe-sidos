import { Divider, Form, Space } from "antd";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import BimbinganComponent from "../../components/BimbinganComponent";
import TitlePage from "../../components/TitlePage";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import noDospemIllustrate from "../../assets/noDospem.svg";
import LabelSidos from "../../lib/src/components/FormSidos/fields/LabelSidos";
import TagSidos from "../../lib/src/components/TagSidos";
import colorTagHandler from "../../lib/src/helpers/colorTagHandler";

const BimbinganInfo = () => {
  const [FormKeputusan] = Form.useForm();
  const params = useParams();

  const [state, setState] = useState({
    arrDatasDospem: [],
    tingkatan: "",
    statusJudul: "",
    keterangan: "",
  });

  return (
    <Fragment>
      <TitlePage title="Detail Bimbingan" backRoute="/bimbingan" />

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
          });

          const arrDatasDospem = formData?.usulans?.map((usul) => usul?.dosen);
          setState((prev) => ({
            ...prev,
            arrDatasDospem,
            keterangan: formData?.keterangan,
            statusJudul: formData?.status_judul,
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

        <LabelSidos label="Keterangan : ">{state?.keterangan}</LabelSidos>
      </FormSidos>
    </Fragment>
  );
};
export default BimbinganInfo;

import { Divider, Form } from "antd";
import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BimbinganComponent from "../../components/BimbinganComponent";
import TitlePage from "../../components/TitlePage";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import noDospemIllustrate from "../../assets/noDospem.svg";

const KeputusanEdit = () => {
  const [FormKeputusan] = Form.useForm();
  const { no_bp } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    arrDatasDospem: [],
    tingkatan: "",
  });

  return (
    <Fragment>
      <TitlePage title="Detail Keputusan" backRoute="/keputusan" />
      <FormSidos
        form={FormKeputusan}
        payloadSubmit={{
          no_bp,
          nip: state?.arrDatasDospem?.map((data) => data?.nip),
          tingkatan: state?.tingkatan,
          status_judul: "terima",
          ...FormKeputusan?.getFieldsValue(),
        }}
        payloadFetch={{ no_bp, status_judul: "usulan" }}
        endpoint="getUsulanByNoBp"
        submitEndpoint="addBimbingan"
        customFetch={(formData) => {
          FormKeputusan?.setFieldsValue({
            jdl_from_dosen: formData?.jdl_from_dosen,
            judul: formData?.judul,
            bidang: formData?.bidang,
          });
          setState((prev) => ({
            ...prev,
            arrDatasDospem: formData?.arrDatas,
          }));
        }}
        afterMessageActionClose={() => {
          navigate("/bimbingan");
        }}
      >
        <Field name="judul" label="Judul" type="text" />
        <Field
          name="bidang"
          label="Bidang"
          type="select"
          endpoint="getDataBidang"
        />

        <Field
          name="jdl_from_dosen"
          label="Judul dari Dosen"
          type="select"
          endpoint="getAllDosen"
          selectLabel="name"
          selectValue="name"
        />
        <Divider orientation="center">Dosen Pembimbing</Divider>
        <BimbinganComponent
          arrDatasBimbingan={state?.arrDatasDospem}
          src={noDospemIllustrate}
          textNoData="Belum ada dosen pembimbing"
        />
        <Field
          type="radio"
          required
          label="Status Judul"
          name="status_judul"
          listOptions={[
            {
              label: "Terima",
              value: "terima",
            },
            {
              label: "Tolak",
              value: "tolak",
            },
          ]}
        />
      </FormSidos>
    </Fragment>
  );
};
export default KeputusanEdit;

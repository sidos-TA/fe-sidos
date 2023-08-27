import { Divider, Form, message, Space } from "antd";
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
import BtnSidos from "../../lib/src/components/BtnSidos";
import { Suspense } from "react";
import LoadingSidos from "../../lib/src/components/LoadingSidos";
import { lazy } from "react";
import useFetch from "../../lib/src/helpers/useFetch";
import { responseSuccess } from "../../lib/src/helpers/formatRespons";
import catchHandler from "../../lib/src/helpers/catchHandler";
import useSetting from "../../lib/src/helpers/useSetting";

const KeputusanEditDrawerChangeDospem = lazy(() =>
  import("../../components/keputusan/KeputusanEditDrawerChangeDospem")
);
const KeputusanEdit = () => {
  const [FormKeputusan] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [messageApi, contextHolderMessage] = message.useMessage();
  const fetch = useFetch();

  const [state, setState] = useState({
    arrDatasDospem: [],
    tingkatan: "",
    statusJudul: "",
    keterangan: "",
    no_bp: "",
    prodi: "",
    openModal: false,
    tahun: "",
    semester: "",
    jdl_from_dsn_name: "",
    arrDatasSPK: [],
    loadingSPK: false,
    showTableSPK: false,
  });

  const [stateNewDospem, setStateNewDospem] = useState([]);

  const dataCookie = decodeCookie("token");

  const getSPKHandler = ({ judul, bidang, jdl_from_dosen }) => {
    setState((prev) => ({
      ...prev,
      loadingSPK: true,
    }));
    fetch({
      endpoint: "getSPK",
      payload: {
        judul,
        bidang,
        jdl_from_dosen,
      },
    })
      ?.then((res) => {
        const response = responseSuccess(res);

        if (response?.status === 200) {
          const arrDatasDospem = state?.arrDatasDospem;
          const arrDatasSPK = response?.data;

          setState((prev) => ({
            ...prev,
            arrDatasSPK,
            showTableSPK: true,
          }));

          const objNipDospem = {};
          const selectedArrDospem = [];
          arrDatasDospem?.forEach((data) => {
            objNipDospem[data?.nip] = data;
          });

          arrDatasSPK?.forEach((data) => {
            if (objNipDospem?.[data?.nip] && data?.n_mhs_bimbingan < 1) {
              selectedArrDospem?.push({
                ...data,
                ...objNipDospem[data?.nip],
              });
            }
          });

          const arrNIPSelectedDospem = selectedArrDospem?.map(
            (data) => data?.nip
          );

          setStateNewDospem(arrNIPSelectedDospem);
        }
      })
      ?.catch((e) => {
        catchHandler({
          e,
          messageApi,
          navigate,
        });

        setState((prev) => ({
          ...prev,
          showTableSPK: false,
        }));
      })
      ?.finally(() => {
        setState((prev) => ({
          ...prev,
          loadingSPK: false,
        }));
      });
  };

  useEffect(() => {
    if (
      state?.no_bp &&
      dataCookie?.roles === 2 &&
      dataCookie?.no_bp !== state?.no_bp
    ) {
      navigate("/unauth");
    }
  }, [state?.no_bp]);

  useEffect(() => {
    getSPKHandler({
      judul: FormKeputusan?.getFieldValue("judul"),
      bidang: FormKeputusan?.getFieldValue("bidang"),
      jdl_from_dosen: FormKeputusan?.getFieldValue("jdl_from_dosen") || "",
    });
    // }, [JSON.stringify(FormKeputusan?.getFieldsValue())]);
  }, [
    JSON.stringify(FormKeputusan?.getFieldValue("judul")),
    JSON.stringify(FormKeputusan?.getFieldValue("bidang")),
    JSON.stringify(FormKeputusan?.getFieldValue("jdl_from_dosen")),
  ]);

  return (
    <Fragment>
      {contextHolderMessage}
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
          status_judul: state?.statusJudul,
          tahun: state?.tahun,
          semester: state?.semester,
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
          FormKeputusan?.setFieldsValue({
            jdl_from_dosen: formData?.jdl_from_dosen,
            judul: formData?.judul,
            bidang: formData?.bidang,
            file_pra_proposal: formData?.file_pra_proposal,
          });

          const arrDatasDospem = formData?.usulans?.map((usul) => usul?.dosen);

          // const instanceSelectedDospem = arrDatasDospem?.map(
          //   (data) => data?.nip
          // );

          // setStateNewDospem(instanceSelectedDospem);

          setState((prev) => ({
            ...prev,
            arrDatasDospem,
            tahun: formData?.tahun,
            semester: formData?.semester,
            no_bp: formData?.no_bp,
            prodi: formData?.prodi,
            jdl_from_dsn_name: formData?.jdl_from_dsn_name,
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
            {state?.jdl_from_dsn_name || "Tidak dari dosen manapun"}
            {/* {FormKeputusan?.getFieldValue("jdl_from_dosen") ||
              "Tidak dari dosen manapun"} */}
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
          <BtnSidos
            position="center"
            onClick={() => {
              setState((prev) => ({
                ...prev,
                openModal: true,
              }));
            }}
          >
            Ganti Dosen Pembimbing
          </BtnSidos>
        )}
        <Divider />

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
            {state?.keterangan || "Tidak ada catatan tambahan"}
          </LabelSidos>
        )}
      </FormSidos>

      <Suspense fallback={<LoadingSidos />}>
        <KeputusanEditDrawerChangeDospem
          state={state}
          setState={setState}
          messageApi={messageApi}
          judul={FormKeputusan?.getFieldValue("judul")}
          bidang={FormKeputusan?.getFieldValue("bidang")}
          jdl_from_dosen={FormKeputusan?.getFieldValue("jdl_from_dosen")}
          stateNewDospem={stateNewDospem?.filter(
            (data) => typeof data !== "undefined"
          )}
          setStateNewDospem={setStateNewDospem}
          getSPKHandler={getSPKHandler}
        />
      </Suspense>
    </Fragment>
  );
};
export default KeputusanEdit;

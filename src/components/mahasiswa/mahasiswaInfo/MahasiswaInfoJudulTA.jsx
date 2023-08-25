import { Card, Space, Tooltip, Typography } from "antd";
import { Fragment } from "react";
import TitleSection from "../../TitleSection";
import { useTabsContext } from "../../../context/TabsContext";
import TagSidos from "../../../lib/src/components/TagSidos";
import colorTagHandler from "../../../lib/src/helpers/colorTagHandler";
import stressIllustrate from "../../../assets/stress.svg";
import { useNavigate } from "react-router-dom";
import FilterSemester from "../../FilterSemester";
import IllustrasiSidos from "../../IllustrasiSidos";
import decodeCookie from "../../../lib/src/helpers/decodeCookie";
import sameArrObj from "../../../lib/src/helpers/sameArrObj";
import { FilePdfFilled } from "@ant-design/icons";

const MahasiswaDetailJudulTA = () => {
  const { state, payload, setPayload } = useTabsContext();
  const navigate = useNavigate();

  const dataCookie = decodeCookie("token");

  const arrDataJudul = () => {
    if (
      state?.datas?.dosen?.every(
        (dsnJudul) => dsnJudul?.status_usulan === "no confirmed"
      )
    ) {
      return state?.datas?.dosen?.map((data) => ({
        judul: data?.judul,
        status_judul: data?.status_judul,
        file_pra_proposal: data?.file_pra_proposal,
        bidang: data?.bidang,
        keterangan: "Belum diproses kaprodi",
      }));
    } else {
      return state?.datas?.dosen
        ?.filter((dsnJudul) => dsnJudul?.status_usulan === "confirmed")
        .map((data) => ({
          judul: data?.judul,
          status_judul: data?.status_judul,
          file_pra_proposal: data?.file_pra_proposal,
          bidang: data?.bidang,
          keterangan: data?.keterangan || "Tidak ada catatan dari kaprodi",
        }));
    }
  };
  const uniqueArrJudul = sameArrObj({ arr: arrDataJudul(), props: "judul" });

  return (
    <Fragment>
      <FilterSemester payloadState={payload} setStatePayload={setPayload} />

      <TitleSection title="Judul TA" />

      {uniqueArrJudul?.length ? (
        <Space
          size="large"
          wrap
          style={{
            textAlign: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {uniqueArrJudul?.map((data, idx) => (
            <Card
              title={`Judul ${idx + 1}`}
              key={`${data}_${idx}`}
              actions={[
                <Typography.Text
                  key="keterangan"
                  strong
                  ellipsis={{
                    tooltip: data?.judul,
                  }}
                  style={{ width: 300 }}
                >
                  {data?.keterangan}
                </Typography.Text>,
              ]}
            >
              <div style={{ textAlign: "center" }}>
                <Space direction="vertical" style={{ textAlign: "center" }}>
                  <Typography.Text
                    strong
                    ellipsis={{
                      tooltip: data?.judul,
                    }}
                    style={{ width: 300 }}
                  >
                    {data?.judul}
                  </Typography.Text>
                  <TagSidos color={colorTagHandler(data?.status_judul)}>
                    {data?.status_judul}
                  </TagSidos>
                  <Tooltip title={`${data?.judul}.pdf`}>
                    <FilePdfFilled
                      style={{ color: "#FF0000", marginRight: 10 }}
                    />
                    <Typography.Link
                      style={{ width: 300 }}
                      ellipsis
                      href={data?.file_pra_proposal}
                      target="_blank"
                    >{`${data?.judul}.pdf`}</Typography.Link>
                  </Tooltip>
                </Space>
              </div>
            </Card>
          ))}
        </Space>
      ) : (
        <div style={{ textAlign: "center" }}>
          <IllustrasiSidos
            {...(dataCookie?.roles === 2 && {
              onBtnText: "Usulkan Judul",
              onClickBtn: () => {
                navigate("/usulan/usulan_Add");
              },
            })}
            src={stressIllustrate}
            subTitle={`${state?.datas?.name} Belum ada judul yang diusulkan`}
          />
        </div>
      )}
    </Fragment>
  );
};
export default MahasiswaDetailJudulTA;

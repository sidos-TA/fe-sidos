import { Space, Typography } from "antd";
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

const MahasiswaDetailJudulTA = () => {
  const { state, payload, setPayload } = useTabsContext();
  const navigate = useNavigate();

  const dataCookie = decodeCookie("token");

  const arrDataJudul = state?.datas?.dosen?.map((data) => ({
    judul: data?.judul,
    status_judul: data?.status_judul,
  }));
  const uniqueArrJudul = sameArrObj({ arr: arrDataJudul, props: "judul" });

  return (
    <Fragment>
      <FilterSemester payloadState={payload} setStatePayload={setPayload} />

      <TitleSection title="Judul TA" />

      {uniqueArrJudul?.length ? (
        <Fragment>
          {uniqueArrJudul?.map((data, idx) => (
            <div style={{ textAlign: "center" }} key={`${data}_${idx}`}>
              <Space direction="vertical" style={{ textAlign: "center" }}>
                <Typography.Text strong>{data?.judul}</Typography.Text>
                <TagSidos color={colorTagHandler(data?.status_judul)}>
                  {data?.status_judul}
                </TagSidos>
              </Space>
            </div>
          ))}
        </Fragment>
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

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

const MahasiswaDetailJudulTA = () => {
  const { state, payload, setPayload } = useTabsContext();
  const navigate = useNavigate();

  const dataCookie = decodeCookie("token");

  const getDataUsul = () => {
    if (
      state?.datas?.dosen?.some((data) => data?.status_usulan === "confirmed")
    ) {
      const findConfirmedStatus = state?.datas?.dosen?.find(
        (data) => data?.status_usulan === "confirmed"
      );
      return {
        judul: findConfirmedStatus?.judul,
        statusJudul: findConfirmedStatus?.status_judul,
      };
    } else if (
      state?.datas?.dosen?.every(
        (data) => data?.status_usulan === "no confirmed"
      )
    ) {
      return {
        judul: state?.datas?.dosen?.[0]?.judul,
        statusJudul: state?.datas?.dosen?.[0]?.status_judul,
      };
    }
  };

  return (
    <Fragment>
      <FilterSemester payloadState={payload} setStatePayload={setPayload} />
      <TitleSection title="Judul TA" />
      {getDataUsul()?.statusJudul ? (
        <div style={{ textAlign: "center" }}>
          <Space direction="vertical" style={{ textAlign: "center" }}>
            <Typography.Text strong>{getDataUsul()?.judul}</Typography.Text>
            <TagSidos color={colorTagHandler(getDataUsul()?.statusJudul)}>
              {getDataUsul()?.statusJudul}
            </TagSidos>
          </Space>
        </div>
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

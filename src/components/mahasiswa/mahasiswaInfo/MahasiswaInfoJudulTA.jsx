import { Image, Space, Typography } from "antd";
import { Fragment } from "react";
import TitleSection from "../../TitleSection";
import { useTabsContext } from "../../../context/TabsContext";
import TagSidos from "../../../lib/src/components/TagSidos";
import colorTagHandler from "../../../lib/src/helpers/colorTagHandler";
import stressIllustrate from "../../../assets/stress.svg";
import BtnSidos from "../../../lib/src/components/BtnSidos";
import { useNavigate } from "react-router-dom";

const MahasiswaDetailJudulTA = () => {
  const { state } = useTabsContext();
  const navigate = useNavigate();

  return (
    <Fragment>
      <TitleSection title="Judul TA" />
      {state?.datas?.status_judul !== "belum mengajukan" ? (
        <div style={{ textAlign: "center" }}>
          <Space direction="vertical" style={{ textAlign: "center" }}>
            {/* <Typography.Text>{state?.datas?.judul_acc}</Typography.Text> */}
            <Typography.Text strong>
              {state?.datas?.usulans?.[0]?.judul}
            </Typography.Text>
            <TagSidos color={colorTagHandler(state?.datas?.status_judul)}>
              {state?.datas?.status_judul}
            </TagSidos>
          </Space>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Space direction="vertical">
            <Image src={stressIllustrate} width={450} preview={false} />
            <TitleSection title="Belum ada judul yang diusulkan" />
            <TagSidos color={colorTagHandler(state?.datas?.status_judul)}>
              {state?.datas?.status_judul}
            </TagSidos>
            <BtnSidos
              type="primary"
              onClick={() => {
                navigate("/usulan/usulan_Add");
              }}
            >
              Usulkan Judul
            </BtnSidos>
          </Space>
        </div>
      )}
    </Fragment>
  );
};
export default MahasiswaDetailJudulTA;

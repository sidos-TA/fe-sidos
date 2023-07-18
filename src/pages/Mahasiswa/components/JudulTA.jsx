import { Divider, Space, Tag, Typography } from "antd";
import { Fragment } from "react";
import TitleSection from "../../../components/TitleSection";
import { useTabsContext } from "../../../context/TabsContext";
import TagSidos from "../../../lib/src/components/TagSidos";
import colorTagHandler from "../../../lib/src/helpers/colorTagHandler";

const JudulTA = () => {
  const { state } = useTabsContext();
  return (
    <Fragment>
      <TitleSection title="Judul TA yang diterima" />
      {state?.datas?.status_judul === "terima" ? (
        <Space direction="vertical" style={{ textAlign: "center" }}>
          <Typography.Text>{state?.datas?.judul_acc}</Typography.Text>
          <TagSidos color={colorTagHandler(state?.datas?.status_judul)}>
            {state?.datas?.status_judul}
          </TagSidos>
        </Space>
      ) : (
        <>Belum ada judul yang diacc</>
      )}
    </Fragment>
  );
};
export default JudulTA;

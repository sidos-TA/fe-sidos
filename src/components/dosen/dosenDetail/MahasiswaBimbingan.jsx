import { Image, Space } from "antd";
import { Fragment } from "react";
import { useTabsContext } from "../../../context/TabsContext";
import AvatarSidos from "../../../lib/src/components/AvatarSidos";
import TitleSection from "../../TitleSection";
import noDataIllustrate from "../../../assets/noData.svg";
import TitlePage from "../../TitlePage";

const MahasiswaBimbingan = () => {
  const { state } = useTabsContext();
  return (
    <Fragment>
      <TitleSection title="Mahasiswa Bimbingan" />
      {state?.datas?.mh?.length ? (
        <div style={{ textAlign: "center" }}>
          <Space wrap>
            {state?.datas?.mh?.map((mh, idx) => {
              return (
                <AvatarSidos
                  key={mh}
                  badgeText={`Mahasiswa ${idx + 1}`}
                  mainInfo={mh?.name}
                  subInfo={mh?.prodi}
                />
              );
            })}
          </Space>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Space direction="vertical" style={{ textAlign: "center" }}>
            <Image src={noDataIllustrate} preview={false} width={450} />
            <TitleSection title="Belum ada Mahasiswa Bimbingan" />
          </Space>
        </div>
      )}
    </Fragment>
  );
};

export default MahasiswaBimbingan;

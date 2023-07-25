import { Space } from "antd";
import { Fragment } from "react";
import { useTabsContext } from "../../../context/TabsContext";
import AvatarSidos from "../../../lib/src/components/AvatarSidos";
import TitleSection from "../../TitleSection";

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
        <Fragment />
      )}
    </Fragment>
  );
};

export default MahasiswaBimbingan;

import { Col, Image, Row, Space } from "antd";
import { Fragment } from "react";
import TitleSection from "../../TitleSection";
import { useTabsContext } from "../../../context/TabsContext";
import AvatarSidos from "../../../lib/src/components/AvatarSidos";
import noDospemIllustrate from "../../../assets/noDospem.svg";
import decodeBlob from "../../../lib/src/helpers/decodeBlob";

const MahasiswaDetailDospemList = () => {
  const { state } = useTabsContext();

  return (
    <Fragment>
      <TitleSection title="Dosen Pembimbing" />
      {state?.datas?.dosPem?.length ? (
        <Row
          justify="space-evenly"
          align="middle"
          style={{ marginTop: 20, width: "100%" }}
        >
          {state?.datas?.dosPem?.map((dospem, idx) => {
            return (
              <Col key={idx}>
                <AvatarSidos
                  src={decodeBlob(dospem?.photo)}
                  badgeText={`Dospem ${idx + 1}`}
                  mainInfo={dospem?.name}
                  subInfo={dospem?.jabatan}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Space direction="vertical" style={{ textAlign: "center" }}>
            <Image src={noDospemIllustrate} preview={false} width={450} />
            <TitleSection
              title={`${state?.datas?.name} belum ada Dosen Pembimbing`}
            />
          </Space>
        </div>
      )}
    </Fragment>
  );
};
export default MahasiswaDetailDospemList;

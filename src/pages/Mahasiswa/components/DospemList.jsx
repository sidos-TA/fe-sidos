import { Badge, Col, Image, Row, Space, Typography } from "antd";
import { Fragment } from "react";
import TitleSection from "../../../components/TitleSection";
import { useTabsContext } from "../../../context/TabsContext";
import AvatarSidos from "../../../lib/src/components/AvatarSidos";
import BadgeSidos from "../../../lib/src/components/BadgeSidos";

const DospemList = () => {
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
                  badgeText={`Dospem ${idx + 1}`}
                  mainInfo={dospem?.name}
                  subInfo={dospem?.jabatan}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <p>Ga ada</p>
      )}
    </Fragment>
  );
};
export default DospemList;

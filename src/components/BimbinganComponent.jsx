import { Col, Image, Row, Space } from "antd";
import { Fragment } from "react";
import AvatarSidos from "../lib/src/components/AvatarSidos";
import decodeBlob from "../lib/src/helpers/decodeBlob";
import TitleSection from "./TitleSection";

const BimbinganComponent = ({
  titleSection,
  textNoData,
  arrDatasBimbingan,
  src,
  propMainInfo,
  badgeText,
  propSubInfo,
  propBody,
}) => {
  return (
    <Fragment>
      {titleSection && <TitleSection title={titleSection} />}
      {arrDatasBimbingan?.length ? (
        <Row
          justify="space-evenly"
          align="middle"
          style={{ marginTop: 20, width: "100%" }}
        >
          {arrDatasBimbingan?.map((bimbing, idx) => {
            return (
              <Col key={idx}>
                <AvatarSidos
                  src={decodeBlob(bimbing?.photo)}
                  badgeText={`${badgeText} ${idx + 1}`}
                  mainInfo={bimbing?.[propMainInfo]}
                  subInfo={bimbing?.[propSubInfo]}
                  body={bimbing?.[propBody]}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Space direction="vertical" style={{ textAlign: "center" }}>
            <Image src={src} preview={false} width={450} />
            <TitleSection title={textNoData} />
          </Space>
        </div>
      )}
    </Fragment>
  );
};
export default BimbinganComponent;

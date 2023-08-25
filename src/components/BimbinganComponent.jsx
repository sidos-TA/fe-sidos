import { Col, Image, Row, Space, Tabs, Typography } from "antd";
import { Fragment } from "react";
import AvatarSidos from "../lib/src/components/AvatarSidos";
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
  isUseTabs = false,
}) => {
  const tabsTitle = [...new Set(arrDatasBimbingan?.map((data) => data?.judul))];

  const itemsAntd = tabsTitle?.map((title, idx) => {
    const dataBasedOnTabs = arrDatasBimbingan?.filter(
      (data) => data?.judul === title
    );
    return {
      key: idx,
      label: (
        <Typography.Text
          style={{ width: 100 }}
          ellipsis={{
            tooltip: title,
          }}
        >
          {title}
        </Typography.Text>
      ),
      children: (
        <Row
          justify="space-evenly"
          align="middle"
          style={{ marginTop: 20, width: "100%" }}
        >
          {dataBasedOnTabs?.map((bimbing, idx) => {
            return (
              <Col key={idx}>
                <AvatarSidos
                  src={bimbing?.photo}
                  badgeText={`${badgeText} ${idx + 1}`}
                  mainInfo={bimbing?.[propMainInfo]}
                  subInfo={bimbing?.[propSubInfo]}
                  body={bimbing?.[propBody]}
                />
              </Col>
            );
          })}
        </Row>
      ),
    };
  });

  return (
    <Fragment>
      {titleSection && <TitleSection title={titleSection} />}
      {arrDatasBimbingan?.length ? (
        <Fragment>
          {isUseTabs ? (
            <Tabs
              defaultActiveKey={itemsAntd?.[0]?.key}
              items={itemsAntd}
              tabPosition="left"
            />
          ) : (
            <Row
              justify="space-evenly"
              align="middle"
              style={{ marginTop: 20, width: "100%" }}
            >
              {arrDatasBimbingan?.map((bimbing, idx) => {
                return (
                  <Col key={idx}>
                    <AvatarSidos
                      src={bimbing?.photo}
                      badgeText={`${badgeText} ${idx + 1}`}
                      mainInfo={bimbing?.[propMainInfo]}
                      subInfo={bimbing?.[propSubInfo]}
                      body={bimbing?.[propBody]}
                    />
                  </Col>
                );
              })}
            </Row>
          )}
        </Fragment>
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

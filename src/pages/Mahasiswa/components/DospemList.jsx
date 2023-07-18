import { Badge, Col, Image, Row, Space, Typography } from "antd";
import { Fragment } from "react";
import TitleSection from "../../../components/TitleSection";
import { useTabsContext } from "../../../context/TabsContext";
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
                <Space
                  direction="vertical"
                  size="small"
                  style={{ textAlign: "center" }}
                >
                  <BadgeSidos
                    count={"Dospem 1"}
                    color="#52c41a"
                    offset={[-145, 270]}
                  >
                    <Image
                      style={{ borderRadius: 500 }}
                      width={280}
                      preview={false}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </BadgeSidos>
                  <Typography.Title level={5}>{dospem?.name}</Typography.Title>
                  <Typography.Text>{dospem?.jabatan}</Typography.Text>
                </Space>
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

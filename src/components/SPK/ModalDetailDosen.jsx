import { Col, Collapse, Modal, Row, Typography } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import ImageSidos from "../../lib/src/components/ImageSidos";
import DosenInformasiPribadi from "./DosenInformasiPribadi";
import DosenBidang from "./DosenBidang";
import DosenPenelitian from "./DosenPenelitian";

const { Panel } = Collapse;
const ModalDetailDosen = ({
  stateModal = { isOpenModal: false, objDosenDetail: {} },
  setStateModal,
}) => {
  return (
    <Modal
      width={1000}
      open={stateModal?.isOpenModal}
      onCancel={() => {
        setStateModal((prev) => ({
          ...prev,
          isOpenModal: false,
          objDosenDetail: {},
        }));
      }}
      footer={null}
    >
      <Row align="middle" justify="space-around" style={{ width: "100%" }}>
        <Col span={12}>
          <Collapse
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined
                style={{ fontSize: 18 }}
                rotate={isActive ? 90 : 0}
              />
            )}
            style={{
              background: "transparent",
              border: "none",
            }}
          >
            <Panel
              style={{
                border: "none",
              }}
              header={
                <Typography.Paragraph strong>
                  Informasi Pribadi
                </Typography.Paragraph>
              }
              key="1"
              title="Informasi Pribadi"
            >
              <DosenInformasiPribadi stateModal={stateModal} />
            </Panel>

            <Panel
              style={{
                border: "none",
              }}
              header={
                <Typography.Paragraph strong>Bidang</Typography.Paragraph>
              }
              key="2"
              title="Bidang"
            >
              <DosenBidang stateModal={stateModal} />
            </Panel>
          </Collapse>
        </Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <ImageSidos src={stateModal?.objDosenDetail?.photo} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Collapse
            expandIcon={({ isActive }) => (
              <CaretRightOutlined
                style={{ fontSize: 18 }}
                rotate={isActive ? 90 : 0}
              />
            )}
            style={{
              background: "transparent",
              border: "none",
            }}
          >
            <Panel
              style={{
                border: "none",
              }}
              header={
                <Typography.Paragraph strong>Penelitian</Typography.Paragraph>
              }
              key="3"
              title="Penelitian"
            >
              <DosenPenelitian stateModal={stateModal} />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalDetailDosen;

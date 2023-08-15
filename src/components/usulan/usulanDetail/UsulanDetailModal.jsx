import { Col, Collapse, Modal, Row, Typography } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import ImageSidos from "../../../lib/src/components/ImageSidos";
import UsulanDetailPenelitian from "./UsulanDetailPenelitian";
import UsulanDetailBidang from "./UsulanDetailBidang";
import UsulanDetailInformasiPribadi from "./UsulanDetailInformasiPribadi";
import { useUsulanFormContext } from "../../../context/Usulan/UsulanFormContext";

const { Panel } = Collapse;
const UsulanDetailModal = () => {
  const { state, setState } = useUsulanFormContext();

  return (
    <Modal
      width={1000}
      open={state?.isOpenModal}
      onCancel={() => {
        setState((prev) => ({
          ...prev,
          isOpenModal: false,
          objDosenDetail: {},
        }));
      }}
      footer={null}
    >
      <Row align="top" justify="space-around" style={{ width: "100%" }}>
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
              <UsulanDetailInformasiPribadi />
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
              <UsulanDetailBidang />
            </Panel>
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
              <UsulanDetailPenelitian />
            </Panel>
          </Collapse>
        </Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <ImageSidos src={state?.objDosenDetail?.photo} />
        </Col>
      </Row>
    </Modal>
  );
};

export default UsulanDetailModal;

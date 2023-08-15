import { Col, Modal, Row, Typography } from "antd";
import SmallTextSidos from "../../../lib/src/components/SmallTextSidos";

const DosenAddModalHintScrape = ({ visibleModal, toggleVisibleModal }) => {
  return (
    <Modal
      title="Petunjuk link scrape"
      open={visibleModal}
      onCancel={() => toggleVisibleModal(false)}
    >
      <Row gutter={8}>
        <Col span={24}>
          <Typography.Title level={4}>1. Link Google Scholar</Typography.Title>
          <SmallTextSidos>Contoh : </SmallTextSidos>
          <Typography.Link
            href="https://scholar.google.co.id/citations?user=sBMUB_oAAAAJ&hl=en"
            target="_blank"
          >
            https://scholar.google.co.id/citations?user=sBMUB_oAAAAJ&hl=en
          </Typography.Link>
        </Col>
        <Col span={24}>
          <Typography.Title level={4}>2. Link SINTA</Typography.Title>
          <SmallTextSidos>Contoh : </SmallTextSidos>
          <Typography.Link
            href="https://sinta.kemdikbud.go.id/authors/profile/5975873"
            target="_blank"
          >
            https://sinta.kemdikbud.go.id/authors/profile/5975873
          </Typography.Link>
        </Col>
      </Row>
    </Modal>
  );
};

export default DosenAddModalHintScrape;

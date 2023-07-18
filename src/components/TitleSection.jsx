import { Col, Row, Typography } from "antd";

const TitleSection = ({ title }) => {
  return (
    <Row style={{ marginBottom: 20 }}>
      <Col span={24} style={{ textAlign: "center" }}>
        <Typography.Title level={4}>{title}</Typography.Title>
      </Col>
    </Row>
  );
};
export default TitleSection;

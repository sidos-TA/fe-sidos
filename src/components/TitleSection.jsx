import { Col, Row, Typography } from "antd";

const TitleSection = ({ title, textProps }) => {
  return (
    <Row style={{ marginBottom: 20 }}>
      <Col span={24} style={{ textAlign: "center" }}>
        <Typography.Title level={4} {...textProps}>
          {title}
        </Typography.Title>
      </Col>
    </Row>
  );
};
export default TitleSection;

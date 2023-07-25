import { Col, Image, Space } from "antd";
import Typography from "antd/es/typography/Typography";
import { useNavigate } from "react-router-dom";
import ErrorIllustrate from "./assets/error.svg";
import TitlePage from "./components/TitlePage";
import BtnSidos from "./lib/src/components/BtnSidos";

const FallbackComponent = ({ error }) => {
  return (
    <Col
      span={24}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Space direction="vertical" style={{ textAlign: "center" }}>
        <TitlePage
          title="Upps... Terjadi Kesalahan"
          styleRow={{ justifyContent: "center" }}
        />
        <Typography.Text>{error}</Typography.Text>
        <Image src={ErrorIllustrate} preview={false} width={450} />
        <BtnSidos
          type="primary"
          position="center"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Kembali ke home
        </BtnSidos>
      </Space>
    </Col>
  );
};

export default FallbackComponent;

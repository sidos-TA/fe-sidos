import { Col, Image, Space } from "antd";
import { useNavigate } from "react-router-dom";
import notAuthorized from "../assets/notAuthorized.svg";
import TitlePage from "../components/TitlePage";
import BtnSidos from "../lib/src/components/BtnSidos";

const UnAuthPage = () => {
  const navigate = useNavigate();
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
        <TitlePage title="UnAuthorized Access" />
        <Image src={notAuthorized} preview={false} width={450} />
        <BtnSidos
          type="primary"
          position="center"
          onClick={() => {
            navigate("/");
          }}
        >
          Kembali ke home
        </BtnSidos>
      </Space>
    </Col>
  );
};
export default UnAuthPage;

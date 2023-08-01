import { Col, Image, Space } from "antd";
import TitlePage from "../components/TitlePage";
import BtnSidos from "../lib/src/components/BtnSidos";
import TitleSection from "./TitleSection";

const IllustrasiSidos = ({ title, src, onClickBtn, onBtnText, subTitle }) => {
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
        {title && <TitlePage title={title} />}
        <Image src={src} preview={false} width={450} />
        {subTitle && (
          <TitleSection title={subTitle} textProps={{ width: "100px" }} />
        )}
        {onBtnText && onClickBtn && (
          <BtnSidos
            type="primary"
            position="center"
            onClick={() => {
              onClickBtn();
            }}
          >
            {onBtnText}
          </BtnSidos>
        )}
      </Space>
    </Col>
  );
};
export default IllustrasiSidos;

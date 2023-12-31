import { Col, Row, Typography } from "antd";
import BtnSidos from "../lib/src/components/BtnSidos";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const TitlePage = ({
  title,
  backFn,
  isBack = false,
  addRoute = "",
  backRoute = "",
  styleRow,
}) => {
  const navigate = useNavigate();

  const backHandler = () => {
    if (backRoute) {
      navigate(backRoute);
    } else if (backFn) {
      backFn();
    } else {
      navigate('/');
    }
  };

  const addHandler = () => {
    navigate(addRoute);
  };
  return (
    <Row
      align="middle"
      justify={addRoute !== "" && "space-between"}
      style={{ marginBottom: 20 }}
      {...styleRow}
    >
      <Col span={addRoute === "" && 24}>
        <Row gutter={32} align="middle">
          {(isBack || backRoute || backFn) && (
            <Col>
              <ArrowLeftOutlined
                style={{ fontSize: 26, paddingTop: 20 }}
                onClick={backHandler}
              />
            </Col>
          )}
          <Col style={{ textAlign: "center" }}>
            <Typography.Title level={2}>{title}</Typography.Title>
          </Col>
        </Row>
      </Col>
      {addRoute !== "" && (
        <Col>
          <BtnSidos type="primary" onClick={addHandler} icon={<PlusOutlined />}>
            Add
          </BtnSidos>
        </Col>
      )}
    </Row>
  );
};
export default TitlePage;

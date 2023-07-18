import { Col, Row, Space } from "antd";
import { Fragment } from "react";
import { useUsulanAddContext } from "../../../context/Usulan/UsulanAddContext";

const UsulanDetailInformasiPribadi = () => {
  const { state } = useUsulanAddContext();
  const dosenDetail = state?.objDosenDetail;

  return (
    <Fragment>
      <Space direction="vertical" size="large">
        <Row>
          <Col span={24} style={{ fontWeight: "bold" }}>
            Nama
          </Col>
          <Col span={24}>{dosenDetail?.name}</Col>
        </Row>
        <Row>
          <Col span={24} style={{ fontWeight: "bold" }}>
            Nip
          </Col>
          <Col span={24}>{dosenDetail?.nip}</Col>
        </Row>
        <Row>
          <Col span={24} style={{ fontWeight: "bold" }}>
            Jabatan
          </Col>
          <Col span={24}>{dosenDetail?.jabatan}</Col>
        </Row>
        <Row>
          <Col span={24} style={{ fontWeight: "bold" }}>
            Pendidikan
          </Col>
          <Col span={24}>{dosenDetail?.pendidikan}</Col>
        </Row>
      </Space>
    </Fragment>
  );
};

export default UsulanDetailInformasiPribadi;

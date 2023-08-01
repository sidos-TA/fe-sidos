import { Col, Row, Space, Table, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import PieChartSidos from "../../lib/src/components/PieChartSidos";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";
import formattedDate from "../../lib/src/helpers/formattedDate";
import greetingHandler from "../../lib/src/helpers/greetingHandler";

const { Column } = Table;
const Dashboard = () => {
  const [arrDataUsulans, setArrDataUsulans] = useState([]);
  const navigate = useNavigate();
  const dataCookie = decodeCookie("token");

  return (
    <Space direction="vertical" size={50} style={{ width: "100%" }}>
      <TitlePage
        title={`${greetingHandler()}, ${dataCookie?.name || "User"}`}
      />
      <Row gutter={8} justify="center" align="middle">
        <Col span={12} style={{ textAlign: "center" }}>
          <PieChartSidos endpoint="dashboardUsulanMhs" />
          <Typography.Text strong>Banyak Usulan Mahasiswa</Typography.Text>
        </Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <PieChartSidos endpoint="dashboardStatusJudul" />
          <Typography.Text strong>Status Judul Mahasiswa</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Typography.Text strong>Tabel Log Usulan Mahasiswa</Typography.Text>
        </Col>
        <Col span={24}>
          <TableSidos
            arrDatas={arrDataUsulans}
            customFetch={(dataFetch) => {
              setArrDataUsulans(dataFetch?.data?.arrDatas);
            }}
            endpoint="getUsulan"
            tableLayout="fixed"
            onRow={(record) => {
              return {
                onClick: () => {
                  navigate(`/usulan/usulan_edit/${record?.no_bp}`);
                },
              };
            }}
          >
            <Column
              title="Nama Mahasiswa"
              render={(record) => {
                return <>{record?.mh?.name}</>;
              }}
            />
            <Column title="Judul yang diusulkan" dataIndex="judul" />
            <Column title="Bidang" dataIndex="bidang" />
            <Column title="Status Usulan" dataIndex="status_usulan" />
            <Column
              title="Waktu Mengusulkan"
              render={(record) => {
                return <>{formattedDate(record?.createdAt)}</>;
              }}
            />
          </TableSidos>
        </Col>
      </Row>
    </Space>
  );
};

export default Dashboard;

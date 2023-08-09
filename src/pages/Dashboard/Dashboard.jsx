import { Col, Row, Space, Table, Typography } from "antd";
import { Suspense } from "react";
import { lazy } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterSemester from "../../components/FilterSemester";
import TitlePage from "../../components/TitlePage";
import LoadingSidos from "../../lib/src/components/LoadingSidos";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";
import formattedDate from "../../lib/src/helpers/formattedDate";
import greetingHandler from "../../lib/src/helpers/greetingHandler";

const { Column } = Table;

const PieChartSidos = lazy(() =>
  import("../../lib/src/components/PieChartSidos")
);
const Dashboard = () => {
  const navigate = useNavigate();
  const dataCookie = decodeCookie("token");

  const [payload, setPayload] = useState({});

  return (
    <Space direction="vertical" size={50} style={{ width: "100%" }}>
      <TitlePage
        title={`${greetingHandler()}, ${dataCookie?.name || "User"}`}
      />
      <FilterSemester payloadState={payload} setStatePayload={setPayload} />
      <Row gutter={8} justify="center" align="middle">
        <Col span={12} style={{ textAlign: "center" }}>
          <Suspense fallback={<LoadingSidos />}>
            <PieChartSidos endpoint="dashboardUsulanMhs" payload={payload} />
          </Suspense>
          <Typography.Text strong>Banyak Usulan Mahasiswa</Typography.Text>
        </Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <Suspense fallback={<LoadingSidos />}>
            <PieChartSidos endpoint="dashboardStatusJudul" payload={payload} />
          </Suspense>
          <Typography.Text strong>Status Judul Mahasiswa</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Typography.Text strong>Tabel Log Usulan Mahasiswa</Typography.Text>
        </Col>
        <Col span={24}>
          <TableSidos
            payload={payload}
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

import { Avatar, Col, Layout, Menu, Modal, Row } from "antd";
import {
  PieChartOutlined,
  DashboardOutlined,
  SettingOutlined,
  AntDesignOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import LayoutWrapper from "../styled/LayoutWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import getCookie from "../lib/src/helpers/getCookie";
import deleteCookie from "../lib/src/helpers/deleteCookie";
import { Fragment } from "react";
import BtnSidos from "../lib/src/components/BtnSidos";
import decodeCookie from "../lib/src/helpers/decodeCookie";

const { Sider, Content } = Layout;
const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [modal, contextHolder] = Modal.useModal();
  const dataCookie = decodeCookie("token");

  const childrenDatasNotLogin = [
    {
      key: "/login",
      icon: <PieChartOutlined />,
      label: "Login",
    },
    {
      key: "/spk",
      icon: <PieChartOutlined />,
      label: "Rekomendasi Dospem",
    },
    {
      key: "/judul",
      icon: <PieChartOutlined />,
      label: "Judul",
    },
    {
      key: "/forbidden_methods",
      icon: <PieChartOutlined />,
      label: "Metode yang tidak diterima",
    },
  ];

  const menuDatas = [
    {
      label: "Menu",
      key: "menu",
      type: "group",
      children: Object.keys(dataCookie)?.length
        ? [
            dataCookie?.roles === 1 && {
              key: "/dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "/usulan",
              icon: <PieChartOutlined />,
              label: "Usulan",
            },
            dataCookie?.roles === 1 && {
              key: "/bimbingan",
              icon: <PieChartOutlined />,
              label: "Bimbingan",
            },
            dataCookie?.roles === 1 && {
              key: "/kategori",
              icon: <PieChartOutlined />,
              label: "Kategori",
            },
            {
              key: "/judul",
              icon: <PieChartOutlined />,
              label: "Judul",
            },
            {
              key: "/forbidden_methods",
              icon: <PieChartOutlined />,
              label: "Metode yang tidak diterima",
            },
            dataCookie?.roles === 1 && {
              key: "/mahasiswa",
              icon: <PieChartOutlined />,
              label: "Mahasiswa",
            },
            dataCookie?.roles === 1 && {
              key: "/dosen",
              icon: <PieChartOutlined />,
              label: "Dosen",
            },
            dataCookie?.roles === 1 && {
              key: "/prodi",
              icon: <PieChartOutlined />,
              label: "Prodi",
            },
            dataCookie?.roles === 1 && {
              key: "/settings",
              icon: <SettingOutlined />,
              label: "Settings",
            },
          ]
        : childrenDatasNotLogin,
    },
  ];

  return (
    <LayoutWrapper>
      <Layout>
        <Layout hasSider>
          <Sider
            width={280}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <Row style={{ margin: "30px 0" }}>
              <Col span={24} style={{ textAlign: "center" }}>
                Logo Aplikasi
              </Col>
            </Row>
            <Row justify="space-around" align="middle" gutter={[16, 16]}>
              <Col
                style={{ textAlign: "center", cursor: "pointer" }}
                span={24}
                onClick={() => {
                  if (dataCookie?.no_bp) {
                    navigate(`/profile/profilemhs`);
                  } else if (dataCookie?.nip) {
                    navigate(
                      `/dosen/dosen_Info/${dataCookie?.nip}/profiledosen`
                    );
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Avatar
                      size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 92,
                        xxl: 120,
                      }}
                      style
                      icon={<AntDesignOutlined />}
                    />
                  </Col>
                  <Col span={24}>
                    {dataCookie?.username ? dataCookie?.username : "Guest"}
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Menu
                  style={{ padding: "0 10px 100px" }}
                  selectedKeys={[`/${pathname?.split("/")?.[1]}`]}
                  mode="inline"
                  items={menuDatas}
                  onClick={({ key }) => {
                    navigate(key);
                  }}
                />
              </Col>
              {Object.keys(dataCookie)?.length ? (
                <Col
                  span={24}
                  style={{
                    position: "fixed",
                    backgroundColor: "white",
                    bottom: 10,
                    left: 0,
                    width: 240,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    modal.confirm({
                      title: "Apakah yakin untuk keluar ?",
                      onOk: () => {
                        deleteCookie("token");
                        window.location.href = "/spk";
                      },
                    });
                  }}
                >
                  <BtnSidos
                    icon={
                      <LogoutOutlined
                        style={{ rotate: "180deg", color: "red" }}
                      />
                    }
                    style={{ padding: "12px 28px 38px" }}
                    danger
                    type="ghost"
                  >
                    Log out
                  </BtnSidos>
                </Col>
              ) : (
                <Fragment />
              )}
            </Row>
          </Sider>

          <Layout
            style={{
              marginLeft: 280,
              overflow: "auto",
            }}
          >
            <Content
              style={{
                margin: "24px 16px 0",
                overflow: "initial",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      {contextHolder}
    </LayoutWrapper>
  );
};

export default Sidebar;

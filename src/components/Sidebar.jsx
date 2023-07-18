import { Col, Layout, Menu, Row } from "antd";
import { PieChartOutlined, DashboardOutlined } from "@ant-design/icons";
import LayoutWrapper from "../styled/LayoutWrapper";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuDatas = [
    {
      label: "Menu",
      key: "menu",
      type: "group",
      children: [
        {
          key: "/dashboard",
          icon: <DashboardOutlined />,
          label: "Dashboard",
        },
        {
          key: "/usulan",
          icon: <PieChartOutlined />,
          label: "Usulan",
        },
        {
          key: "/bimbingan",
          icon: <PieChartOutlined />,
          label: "Bimbingan",
        },
        {
          key: "/mahasiswa",
          icon: <PieChartOutlined />,
          label: "Mahasiswa",
        },
        {
          key: "/dosen",
          icon: <PieChartOutlined />,
          label: "Dosen",
        },
      ],
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
            <Menu
              style={{ padding: "0 10px" }}
              selectedKeys={[`/${pathname?.split("/")?.[1]}`]}
              // defaultSelectedKeys={[`/${pathname?.split("/")?.[1]}`]}
              mode="inline"
              items={menuDatas}
              onClick={({ key }) => {
                navigate(key);
              }}
            />
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
    </LayoutWrapper>
  );
};

export default Sidebar;

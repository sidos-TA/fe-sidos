import { Col, Layout, Menu, message, Modal, Row } from "antd";
import {
  PieChartOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import LayoutWrapper from "../styled/LayoutWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import deleteCookie from "../lib/src/helpers/deleteCookie";
import { Fragment, useMemo } from "react";
import BtnSidos from "../lib/src/components/BtnSidos";
import decodeCookie from "../lib/src/helpers/decodeCookie";
import useFetch from "../lib/src/helpers/useFetch";
import { useEffect } from "react";
import {
  responseError,
  responseSuccess,
  unAuthResponse,
} from "../lib/src/helpers/formatRespons";
import { useState } from "react";
import ImageSidos from "../lib/src/components/ImageSidos";
import LoadingSidos from "../lib/src/components/LoadingSidos";
import { Suspense } from "react";

const { Sider, Content } = Layout;
const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dataCookie = decodeCookie("token");
  const fetch = useFetch();
  const [profile, setProfile] = useState({
    name: "",
    photo: "",
  });
  const [loadingFetchProfile, setLoadingFetchProfile] = useState(false);
  const [messageApi, contextHolderMessage] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();

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
            dataCookie?.roles !== 3 && {
              key: "/usulan",
              icon: <PieChartOutlined />,
              label: "Usulan",
            },
            dataCookie?.roles !== 3 && {
              key: "/keputusan",
              icon: <PieChartOutlined />,
              label: "Keputusan",
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
            dataCookie?.roles !== 3 && {
              key: "/judul",
              icon: <PieChartOutlined />,
              label: "Judul",
            },
            dataCookie?.roles !== 3 && {
              key: "/forbidden_methods",
              icon: <PieChartOutlined />,
              label: "Metode yang tidak diterima",
            },
            dataCookie?.roles === 1 && {
              key: "/mahasiswa",
              icon: <PieChartOutlined />,
              label: "Mahasiswa",
            },
            (dataCookie?.roles === 1 || dataCookie?.roles === 3) && {
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

  const fetchDatas = () => {
    setLoadingFetchProfile(true);
    fetch({
      endpoint: dataCookie?.roles === 1 ? "getDosenByNIP" : "getMhsByNoBp",
      payload: {
        ...(dataCookie?.roles === 1
          ? { nip: dataCookie?.nip }
          : { no_bp: dataCookie?.no_bp }),
      },
    })
      ?.then((response) => {
        const res = responseSuccess(response);

        if (res?.status === 200) {
          setProfile((prev) => ({
            ...prev,
            name: res?.data?.name,
            photo: res?.data?.photo,
          }));
        }
      })
      ?.catch((e) => {
        const err = responseError(e);

        if (err?.status === 401) {
          unAuthResponse({
            err,
            messageApi,
            isBackToLogin: pathname !== "/login",
          });
        } else {
          messageApi.open({
            type: "error",
            key: "errMsg",
            content: err?.error,
          });
        }
      })
      ?.finally(() => {
        setLoadingFetchProfile(false);
      });
  };

  const saveCurrRouteHandler = useMemo(() => {
    if (Object.keys(dataCookie)?.length) {
      sessionStorage?.setItem("currRoute", pathname);
    }
  }, [pathname]);

  useEffect(() => {
    if (
      Object.keys(dataCookie)?.length &&
      pathname !== "login" &&
      dataCookie?.roles !== 3
    ) {
      fetchDatas();
    }
  }, []);

  saveCurrRouteHandler;

  // useEffect(() => {
  //   saveCurrRouteHandler;
  // }, [pathname]);

  return (
    <>
      {contextHolderMessage}
      <LayoutWrapper>
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
                    navigate(`/dosen_prfl/profiledosen`);
                  } else {
                    navigate("/login");
                  }
                }}
              >
                {dataCookie?.roles !== 3 && (
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      {loadingFetchProfile ? (
                        <LoadingSidos style={{ height: "20vh" }} />
                      ) : (
                        <ImageSidos
                          preview={false}
                          width={160}
                          src={profile?.photo}
                        />
                      )}
                    </Col>
                    <Col span={24}>
                      {profile?.name ? profile?.name : "Guest"}
                    </Col>
                  </Row>
                )}
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
                        sessionStorage?.removeItem("currRoute");
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
              <Suspense fallback={<LoadingSidos style={{ height: "100vh" }} />}>
                {children}
              </Suspense>
            </Content>
          </Layout>
        </Layout>
        {contextHolder}
      </LayoutWrapper>
    </>
  );
};

export default Sidebar;

import { Fragment } from "react";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoadingSidos from "./lib/src/components/LoadingSidos";
import getCookie from "./lib/src/helpers/getCookie";
import UnAuthPage from "./pages/403Page";
import TestPage from "./pages/TestPage";
import BimbinganRoute from "./routes/BimbinganRoute";
import DashboardRoute from "./routes/DashboardRoute";
import DosenRoute from "./routes/DosenRoute";
import JudulRoute from "./routes/JudulRoute";
import KategoriRoute from "./routes/KategoriRoute";
import MahasiswaRoute from "./routes/MahasiswaRoute";
import ProdiRoute from "./routes/ProdiRoute";
import RouteNotLogin from "./routes/RouteNotLogin";
import SettingsRoute from "./routes/Settings";
import UsulanRoute from "./routes/UsulanRoute";

const NotFound = lazy(() => import("./pages/404Page"));
const Login = lazy(() => import("./pages/Login"));

const Routing = () => {
  const cookie = getCookie("token");

  const ArrRoute = [
    ...DashboardRoute,
    ...SettingsRoute,
    ...UsulanRoute,
    ...BimbinganRoute,
    ...MahasiswaRoute,
    ...DosenRoute,
    ...JudulRoute,
    ...ProdiRoute,
    ...KategoriRoute,
  ];

  const arrRouteNotLogin = [...RouteNotLogin];

  return (
    <Fragment>
      <Sidebar>
        <Suspense fallback={<LoadingSidos style={{ height: "100vh" }} />}>
          <Routes>
            {cookie ? (
              <Fragment>
                <Route
                  key="base"
                  path="/"
                  element={<Navigate to="/usulan/usulan_Add" />}
                />
                <Route
                  key="spk"
                  path="/spk"
                  element={<Navigate to="/usulan/usulan_Add" />}
                />

                {ArrRoute?.map((route, idx) => (
                  <Route key={idx} {...route} />
                ))}
              </Fragment>
            ) : (
              <Fragment>
                <Route path="/" element={<Navigate to="/spk" />} />
                <Route path="/login" element={<Login />} />
                {arrRouteNotLogin?.map((route, idx) => (
                  <Route key={idx} {...route} />
                ))}
              </Fragment>
            )}
            <Route element={<UnAuthPage />} path="/unauth" />
            <Route key="test_page" path="/test_page" element={<TestPage />} />
            <Route key="not_found" path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Sidebar>
    </Fragment>
  );
};

export default Routing;

import { Fragment } from "react";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import isDev from "./lib/src/constants/isDev";
import decodeCookie from "./lib/src/helpers/decodeCookie";
import getCookie from "./lib/src/helpers/getCookie";
import UnAuthPage from "./pages/403Page";
import TestPage from "./pages/TestPage";
import BimbinganRoute from "./routes/BimbinganRoute";
import DashboardRoute from "./routes/DashboardRoute";
import DosenRoute from "./routes/DosenRoute";
import ForbiddenMethodsRoute from "./routes/ForbiddenMethodsRoute";
import JudulRoute from "./routes/JudulRoute";
import KategoriRoute from "./routes/KategoriRoute";
import KeputusanRoute from "./routes/KeputusanRoute";
import MahasiswaRoute from "./routes/MahasiswaRoute";
import ProdiRoute from "./routes/ProdiRoute";
import RouteNotLogin from "./routes/RouteNotLogin";
import SettingsRoute from "./routes/Settings";
import UsulanRoute from "./routes/UsulanRoute";

const NotFound = lazy(() => import("./pages/404Page"));
const Login = lazy(() => import("./pages/Login"));

const Routing = () => {
  const cookie = getCookie("token");
  const dataCookie = () => decodeCookie("token");

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
    ...KeputusanRoute,
    ...ForbiddenMethodsRoute,
  ];

  const arrRouteNotLogin = [...RouteNotLogin];

  return (
    <Fragment>
      <Routes>
        {cookie ? (
          <Fragment>
            <Route
              key="base"
              path="/"
              element={
                <Navigate
                  to={dataCookie()?.roles === 1 ? "/dashboard" : "/usulan"}
                />
              }
            />
            <Route
              key="spk"
              path="/spk"
              element={<Navigate to="/usulan/usulan_Add" />}
            />
            <Route
              key="try_to_access_login"
              path="/login"
              element={
                <Navigate
                  to={
                    dataCookie()?.roles === 1
                      ? "/dosen_prfl/profiledosen"
                      : dataCookie?.roles === 2
                      ? "/profile/profilemhs"
                      : "/dosen" // mau minta tolong ke rizal
                  }
                />
              }
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
        {isDev && (
          <Route key="test_page" path="/test_page" element={<TestPage />} />
        )}
        <Route key="not_found" path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default Routing;

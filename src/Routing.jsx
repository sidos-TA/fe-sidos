import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import TestPage from "./pages/TestPage";
import BimbinganRoute from "./routes/BimbinganRoute";
import DashboardRoute from "./routes/DashboardRoute";
import DosenRoute from "./routes/DosenRoute";
import MahasiswaRoute from "./routes/MahasiswaRoute";
import UsulanRoute from "./routes/UsulanRoute";

const NotFound = lazy(() => import("./pages/404Page"));
const Routing = () => {
  const ArrRoute = [
    ...DashboardRoute,
    ...UsulanRoute,
    ...BimbinganRoute,
    ...MahasiswaRoute,
    ...DosenRoute,
  ];

  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route key="base" path="/" element={<App />} />
        {ArrRoute?.map((route, idx) => (
          <Route key={idx} {...route} />
        ))}
        <Route key="test_page" path="/test_page" element={<TestPage />} />
        <Route key="not_found" path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;

import { Affix, message, Segmented } from "antd";
import { memo, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TabsContext from "../context/TabsContext";
import LoadingSidos from "../lib/src/components/LoadingSidos";
import basePathName from "../lib/src/constants/basePathName";
import catchHandler from "../lib/src/helpers/catchHandler";
import { responseSuccess } from "../lib/src/helpers/formatRespons";
import useFetch from "../lib/src/helpers/useFetch";
import NotFound from "../pages/404Page";

const TabsSegmented = ({
  listTabs = [],
  endpoint,
  payload,
  onChange,
  tabsContext = {},
  ...props
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const fetch = useFetch();
  const [messageApi, contextHolder] = message.useMessage();

  const [state, setState] = useState({
    datas: {},
  });

  const routes = listTabs?.map((tab) => ({
    element: tab?.element,
    path: tab?.value,
  }));

  const fetchDatas = () => {
    if (endpoint) {
      fetch({
        endpoint,
        payload,
      })
        ?.then((res) => {
          const response = responseSuccess(res);
          if (response?.status === 200) {
            if (
              Object.keys(response?.data)?.length ||
              response?.data !== null
            ) {
              setState((prev) => ({
                ...prev,
                datas: response?.data,
              }));
            } else {
              navigate(basePathName);
            }
          }
        })
        ?.catch((e) => {
          catchHandler({ e, messageApi, navigate });
        });
    }
  };

  useEffect(() => {
    fetchDatas();
  }, [endpoint, JSON.stringify(payload)]);
  return (
    <>
      {contextHolder}
      <TabsContext.Provider
        value={{
          state,
          setState,
          ...tabsContext,
        }}
      >
        <Affix offsetTop={0}>
          <Segmented
            {...props}
            block
            style={{ margin: 20 }}
            size="large"
            defaultValue={
              pathname?.split("/")?.[pathname?.split("/")?.length - 1]
            }
            options={listTabs}
            onChange={(val) => {
              if (onChange) {
                onChange(val);
              } else {
                navigate(val);
              }
            }}
          />
        </Affix>

        <Suspense fallback={<LoadingSidos style={{ height: "100vh" }} />}>
          <Routes>
            {routes?.map(({ element, path }, idx) => {
              return <Route Component={element} path={path} key={idx} />;
            })}
            <Route element={<NotFound />} path="*" key="not_found_page" />
          </Routes>
        </Suspense>
      </TabsContext.Provider>
    </>
  );
};

const TabsSidos = memo(TabsSegmented);
export default TabsSidos;

import { Segmented } from "antd";
import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TabsContext from "../context/TabsContext";
import { responseSuccess } from "../lib/src/helpers/formatRespons";
import useFetch from "../lib/src/helpers/useFetch";

const TabsSegmented = ({
  routes = [],
  listTabs = [],
  endpoint,
  payload,
  onChange,
  ...props
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const fetch = useFetch();

  const [state, setState] = useState({
    datas: {},
  });

  const fetchDatas = () => {
    if (endpoint) {
      fetch({
        endpoint,
        payload,
      })?.then((res) => {
        const response = responseSuccess(res);
        if (response?.status === 200) {
          setState((prev) => ({
            ...prev,
            datas: response?.data,
          }));
        }
      });
    }
  };

  useEffect(() => {
    fetchDatas();
  }, [endpoint]);
  return (
    <TabsContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <Segmented
        {...props}
        block
        style={{ margin: 20 }}
        size="large"
        defaultValue={pathname?.split("/")?.[pathname?.split("/")?.length - 1]}
        options={listTabs}
        onChange={(val) => {
          if (onChange) {
            onChange(val);
          } else {
            navigate(val);
          }
        }}
      />

      <Suspense fallback={<>Loading...</>}>
        <Routes>
          {routes?.map(({ element, path }, idx) => {
            return <Route Component={element} path={path} key={idx} />;
          })}
        </Routes>
      </Suspense>
    </TabsContext.Provider>
  );
};
export default TabsSegmented;

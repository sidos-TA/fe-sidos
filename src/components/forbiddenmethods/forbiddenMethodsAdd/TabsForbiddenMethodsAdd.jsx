import { useState } from "react";
import { lazy } from "react";
import TabsSidos from "../../TabsSegmented";

const TabsForbiddenMethodsAdd = () => {
  const [state, setState] = useState({
    isShowPreviewUploadFile: false,
    arrDatasFiles: [],
  });

  const listTabs = [
    {
      label: <>Input Manual</>,
      value: "input_manual",
      element: lazy(() => import("./ForbiddenMethodsAddInputManual")),
    },

    {
      label: <>Upload File</>,
      value: "upload_file",
      element: lazy(() => import("./ForbiddenMethodsAddUploadFile")),
    },
  ];

  return <TabsSidos listTabs={listTabs} tabsContext={{ state, setState }} />;
};
export default TabsForbiddenMethodsAdd;

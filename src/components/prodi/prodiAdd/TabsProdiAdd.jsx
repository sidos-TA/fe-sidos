import { useState } from "react";
import { lazy } from "react";
import TabsSidos from "../../TabsSegmented";

const TabsProdiAdd = () => {
  const [state, setState] = useState({
    isShowPreviewUploadFile: false,
    arrDatasFiles: [],
  });

  const listTabs = [
    {
      label: <>Input Manual</>,
      value: "input_manual",
      element: lazy(() => import("./ProdiAddInputManual")),
    },

    {
      label: <>Upload File</>,
      value: "upload_file",
      element: lazy(() => import("./ProdiAddUploadFile")),
    },
  ];

  return <TabsSidos listTabs={listTabs} tabsContext={{ state, setState }} />;
};
export default TabsProdiAdd;

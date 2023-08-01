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
      element: lazy(() => import("./JudulAddInputManual")),
    },

    {
      label: <>Upload File</>,
      value: "upload_file",
      element: lazy(() => import("./JudulAddUploadFile")),
    },
  ];

  return <TabsSidos listTabs={listTabs} tabsContext={{ state, setState }} />;
};
export default TabsProdiAdd;

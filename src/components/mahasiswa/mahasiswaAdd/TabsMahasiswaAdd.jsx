import { useState } from "react";
import { lazy } from "react";
import { Fragment } from "react";
import decodeCookie from "../../../lib/src/helpers/decodeCookie";
import TabsSidos from "../../TabsSegmented";
import TitlePage from "../../TitlePage";

const TabsMahasiswaAdd = () => {
  const dataCookie = decodeCookie("token");

  const [state, setState] = useState({
    isShowPreviewUploadFile: false,
    arrDatasFiles: [],
  });

  const listTabs = [
    {
      label: <>Input Manual</>,
      value: "input_manual",
      element: lazy(() => import("./MahasiswaAddInputManual")),
    },

    {
      label: <>Upload File</>,
      value: "upload_file",
      element: lazy(() => import("./MahasiswaAddUploadFile")),
    },
  ];

  return (
    <Fragment>
      <TitlePage
        title="Tambah Mahasiswa"
        {...(dataCookie?.roles === 1 && {
          backRoute: "/mahasiswa",
        })}
      />
      <TabsSidos listTabs={listTabs} tabsContext={{ state, setState }} />
    </Fragment>
  );
};
export default TabsMahasiswaAdd;

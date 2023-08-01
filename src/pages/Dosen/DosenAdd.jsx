import { Fragment, lazy } from "react";
import TabsSidos from "../../components/TabsSegmented";
import TitlePage from "../../components/TitlePage";

const DosenAdd = () => {
  const listTabs = [
    {
      label: <>Input Manual</>,
      value: "input_manual",
      element: lazy(() =>
        import("../../components/dosen/dosenAdd/DosenAddInputManual")
      ),
    },
    {
      label: <>From Link</>,
      value: "get_fromlink",
      element: lazy(() =>
        import("../../components/dosen/dosenAdd/DosenAddGetFromLink")
      ),
    },
    {
      label: <>Upload File</>,
      value: "upload_file",
      element: lazy(() =>
        import("../../components/dosen/dosenAdd/DosenAddUploadFile")
      ),
    },
  ];
  return (
    <Fragment>
      <TitlePage title="Tambah Dosen" backRoute="/dosen" />
      <TabsSidos listTabs={listTabs} />
    </Fragment>
  );
};
export default DosenAdd;

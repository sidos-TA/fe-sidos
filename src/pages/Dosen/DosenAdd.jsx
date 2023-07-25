import { Form } from "antd";
import { Fragment, lazy, useState } from "react";
import TabsSegmented from "../../components/TabsSegmented";
import TitlePage from "../../components/TitlePage";

const DosenAdd = () => {
  const [FormDosen] = Form.useForm();
  const [FormScrape] = Form.useForm();
  const [FormUpload] = Form.useForm();

  const [state, setState] = useState({
    isShowPreviewScrape: false,
    isShowPreviewUploadFile: false,
    isLoadingBtnScrape: false,
    arrDatasFiles: [],
  });

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
      <TabsSegmented
        listTabs={listTabs}
        tabsContext={{
          FormDosen,
          FormScrape,
          state,
          setState,
          FormUpload,
        }}
      />
    </Fragment>
  );
};
export default DosenAdd;

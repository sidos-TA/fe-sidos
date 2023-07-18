import { Fragment, useState } from "react";
import TitlePage from "../components/TitlePage";
import BtnSidos from "../lib/src/components/BtnSidos";
import UploadSidos from "../lib/src/components/FormSidos/fields/UploadSidos";
import ImageSidos from "../lib/src/components/ImageSidos";
import PieChartSidos from "../lib/src/components/PieChartSidos";
import getBlob from "../lib/src/helpers/getBlobUrl";

const TestPage = () => {
  const [imageBlob, setImageBlob] = useState(null);

  const handleChange = async ({ file }) => {
    const blobUrl = await getBlob(file?.originFileObj);
    setImageBlob(blobUrl);
  };

  return (
    <Fragment>
      <TitlePage title="Test Page" />
      <PieChartSidos />
    </Fragment>
  );
};
export default TestPage;

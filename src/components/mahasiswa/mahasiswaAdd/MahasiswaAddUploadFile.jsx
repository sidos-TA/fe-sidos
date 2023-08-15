import { exampleFileMhs } from "../../../lib/src/constants";
import UploadFileAddData from "../../uploadFileInsert/UploadFileAddData";

const DosenAddUploadFile = () => {
  const fileList = [
    {
      name: "Example File Data Mahasiswa.xlsx",
      status: "done",
      url: `${exampleFileMhs}`,
    },
  ];
  return (
    <UploadFileAddData
      submitEndpoint="addMultipleDataMhs"
      propsCardTitle="name"
      propsCardSubtitle="no_bp"
      exampleFile={fileList}
      endpointSelectField={{
        prodi: "getAllProdi",
      }}
      selectLabelSelectField={{
        prodi: "prodiName",
      }}
      selectValueSelectField={{
        prodi: "prodiName",
      }}
    />
  );
};
export default DosenAddUploadFile;

import semesterList from "../../../constants/semesterList";
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
        tahun: "getTahun",
      }}
      selectLabelSelectField={{
        prodi: "prodiName",
        tahun: "tahun",
      }}
      selectValueSelectField={{
        prodi: "prodiName",
        tahun: "tahun",
      }}
      listOptionsSelectField={{
        semester: semesterList,
      }}
      pKey="no_bp"
    />
  );
};
export default DosenAddUploadFile;

import tingkatanProdiList from "../../../constants/tingkatanProdiList";
import { exampleFileProdi } from "../../../lib/src/constants";
import UploadFileAddData from "../../uploadFileInsert/UploadFileAddData";

const ProdiAddUploadFile = () => {
  const fileList = [
    {
      name: "Example File Data Prodi.xlsx",
      status: "done",
      url: `${exampleFileProdi}`,
    },
  ];
  return (
    <UploadFileAddData
      propsCardTitle="prodiName"
      propsCardSubtitle="tingkatan"
      submitEndpoint="addMultipleDataProdi"
      exampleFile={fileList}
      listOptionsSelectField={{
        tingkatan: tingkatanProdiList,
      }}
    />
  );
};
export default ProdiAddUploadFile;

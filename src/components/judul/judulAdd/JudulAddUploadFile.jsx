import tingkatanProdiList from "../../../constants/tingkatanProdiList";
import { exampleFileJudul } from "../../../lib/src/constants";
import UploadFileAddData from "../../uploadFileInsert/UploadFileAddData";

const JudulAddUploadFile = () => {
  const fileList = [
    {
      name: "Example File Data Judul.xlsx",
      status: "done",
      url: `${exampleFileJudul}`,
    },
  ];
  return (
    <UploadFileAddData
      propsCardTitle="judul"
      propsCardSubtitle="bidang"
      submitEndpoint="addMultipleDataJudul"
      exampleFile={fileList}
      listOptionsSelectField={{
        tingkatan: tingkatanProdiList,
      }}
      endpointSelectField={{
        bidang: "getDataBidang",
      }}
    />
  );
};
export default JudulAddUploadFile;

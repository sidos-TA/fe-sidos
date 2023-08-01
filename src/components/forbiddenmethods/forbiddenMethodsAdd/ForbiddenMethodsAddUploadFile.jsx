import tingkatanProdiList from "../../../constants/tingkatanProdiList";
import { exampleFileDosen } from "../../../lib/src/constants";
import UploadFileAddData from "../../uploadFileInsert/UploadFileAddData";

const ForbiddenMethodsAddUploadFile = () => {
  const fileList = [
    {
      name: "Example File Data Metode yang tidak diterima.xlsx",
      status: "done",
      url: `${exampleFileDosen}`,
    },
  ];
  return (
    <UploadFileAddData
      propsCardTitle="methodName"
      propsCardSubtitle="bidang"
      submitEndpoint="addMultipleDataForbidMethods"
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
export default ForbiddenMethodsAddUploadFile;

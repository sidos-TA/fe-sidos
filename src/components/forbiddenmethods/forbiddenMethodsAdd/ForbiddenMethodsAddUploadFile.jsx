import tingkatanProdiList from "../../../constants/tingkatanProdiList";
import { exampleFileForbidMethods } from "../../../lib/src/constants";
import UploadFileAddData from "../../uploadFileInsert/UploadFileAddData";

const ForbiddenMethodsAddUploadFile = () => {
  const fileList = [
    {
      name: "Example File Data Metode yang tidak diterima.xlsx",
      status: "done",
      url: `${exampleFileForbidMethods}`,
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
      selectLabelSelectField={{
        bidang: "bidang",
      }}
      selectValueSelectField={{
        bidang: "bidang",
      }}
    />
  );
};
export default ForbiddenMethodsAddUploadFile;

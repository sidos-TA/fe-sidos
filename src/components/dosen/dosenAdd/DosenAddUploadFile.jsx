import jabatanList from "../../../constants/jabatanList";
import pendidikanList from "../../../constants/pendidikanList";
import { exampleFileDosen } from "../../../lib/src/constants";
import UploadFileAddData from "../../uploadFileInsert/UploadFileAddData";

const DosenAddUploadFile = () => {
  const fileList = [
    {
      name: "Example File Data Dosen.xlsx",
      status: "done",
      url: `${exampleFileDosen}`,
    },
  ];
  return (
    <UploadFileAddData
      propsCardTitle="name"
      propsCardSubtitle="nip"
      submitEndpoint="addMultipleDataDosen"
      exampleFile={fileList}
      listOptionsSelectField={{
        jabatan: jabatanList,
        pendidikan: pendidikanList,
      }}
    />
  );
};
export default DosenAddUploadFile;

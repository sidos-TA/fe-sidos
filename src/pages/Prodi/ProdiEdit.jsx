import { Fragment } from "react";
import { useParams } from "react-router-dom";
import ProdiForm from "../../components/prodi/ProdiForm";
import TitlePage from "../../components/TitlePage";

const ProdiEdit = () => {
  const { id } = useParams();

  return (
    <Fragment>
      <TitlePage title="Edit Data Prodi" backRoute="/prodi" />
      <ProdiForm
        submitEndpoint="updateDataProdi"
        endpoint="getProdiById"
        deleteEndpoint="deleteDataProdi"
        id={id}
      />
    </Fragment>
  );
};
export default ProdiEdit;

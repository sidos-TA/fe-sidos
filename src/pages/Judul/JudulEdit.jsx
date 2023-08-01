import { Fragment } from "react";
import { useParams } from "react-router-dom";
import JudulForm from "../../components/judul/JudulForm";
import TitlePage from "../../components/TitlePage";

const JudulEdit = () => {
  const { id } = useParams();
  return (
    <Fragment>
      <TitlePage title="Edit Judul" backRoute="/judul" />
      <JudulForm
        title="Edit Judul"
        submitEndpoint="updateDataJudul"
        endpoint="getJudulById"
        deleteEndpoint="deleteDataJudul"
        id={id}
      />
    </Fragment>
  );
};
export default JudulEdit;

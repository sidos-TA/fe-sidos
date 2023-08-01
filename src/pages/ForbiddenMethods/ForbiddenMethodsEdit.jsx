import { Fragment } from "react";
import { useParams } from "react-router-dom";
import ForbiddenMethodsForm from "../../components/forbiddenmethods/ForbiddenMethodsForm";
import TitlePage from "../../components/TitlePage";

const ForbiddenMethodsEdit = () => {
  const { id } = useParams();
  return (
    <Fragment>
      <TitlePage
        title="Edit Metode yang tidak diterima"
        backRoute="/forbidden_methods"
      />
      <ForbiddenMethodsForm
        deleteEndpoint="deleteforbidmethods"
        id={id}
        submitEndpoint="updateforbidmethods"
        endpoint="getforbidmethodsById"
      />
    </Fragment>
  );
};
export default ForbiddenMethodsEdit;

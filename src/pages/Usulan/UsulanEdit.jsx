import UsulanForm from "./UsulanForm";

const UsulanEdit = () => {
  return (
    <UsulanForm
      submitEndpoint="updateBimbingan"
      titlePage="Detail Usulan"
      type="edit"
    />
  );
};
export default UsulanEdit;

import UsulanForm from "./UsulanForm";

const UsulanEdit = () => {
  return (
    <UsulanForm
      submitEndpoint="addBimbingan"
      titlePage="Detail Usulan"
      type="edit"
    />
  );
};
export default UsulanEdit;

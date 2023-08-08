import UsulanForm from "./UsulanForm";

const UsulanEdit = () => {
  return (
    <UsulanForm
      submitEndpoint="addKeputusan"
      titlePage="Detail Usulan"
      type="edit"
    />
  );
};
export default UsulanEdit;

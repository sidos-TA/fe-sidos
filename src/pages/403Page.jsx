import { useNavigate } from "react-router-dom";
import notAuthorized from "../assets/notAuthorized.svg";
import IllustrasiSidos from "../components/IllustrasiSidos";

const UnAuthPage = () => {
  const navigate = useNavigate();
  return (
    <IllustrasiSidos
      title="Anda tidak dapat akses"
      onBtnText="Kembali ke home"
      onClickBtn={() => {
        navigate("/");
      }}
      src={notAuthorized}
    />
  );
};
export default UnAuthPage;

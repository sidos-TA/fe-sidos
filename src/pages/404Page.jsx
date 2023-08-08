import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IllustrateNotFound from "../assets/IllustrateNotFound.svg";
import IllustrasiSidos from "../components/IllustrasiSidos";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, []);
  return (
    <IllustrasiSidos
      title="Halaman Tidak Ditemukan"
      onBtnText="Kembali ke home"
      onClickBtn={() => {
        navigate("/");
      }}
      src={IllustrateNotFound}
    />
  );
};
export default NotFound;

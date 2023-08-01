import ErrorIllustrate from "./assets/error.svg";
import IllustrasiSidos from "./components/IllustrasiSidos";

const FallbackComponent = ({ error }) => {
  return (
    <IllustrasiSidos
      title="Upps... Terjadi Kesalahan"
      subTitle={`Pesan Error : ${error}`}
      onBtnText="Refresh"
      onClickBtn={() => {
        window.location.reload();
      }}
      src={ErrorIllustrate}
    />
  );
};

export default FallbackComponent;

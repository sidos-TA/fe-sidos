import { Divider, Form } from "antd";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import DosenAddGetFromLinkContext from "../../../context/Dosen/DosenAdd/DosenAddGetFromLinkContext";
import FormSidos from "../../../lib/src/components/FormSidos/form/FormSidos";
import IllustrasiSidos from "../../IllustrasiSidos";
import TitleSection from "../../TitleSection";
import DosenFields from "./DosenFields";
import DosenScrapeInput from "./DosenScrapeInput";
import APIIllustrate from "../../../assets/api.svg";

const DosenAddGetFromLink = () => {
  const [FormScrape] = Form.useForm();
  const navigate = useNavigate();

  const [state, setState] = useState({
    isShowPreviewScrape: false,
    isLoadingBtnScrape: {},
  });

  const loadingScrapeStateHandler = ({ scrapeType, loadingValue }) => {
    setState((prev) => ({
      ...prev,
      isLoadingBtnScrape: {
        ...state?.isLoadingBtnScrape,
        [scrapeType]: loadingValue,
      },
    }));
  };

  return (
    <DosenAddGetFromLinkContext.Provider
      value={{
        state,
        setState,
        FormScrape,
        loadingScrapeStateHandler,
      }}
    >
      <TitleSection title="Masukkan dari Link" />
      <FormSidos
        form={FormScrape}
        {...(state?.isShowPreviewScrape && {
          submitEndpoint: "addDataDosen",
        })}
        BtnSubmitProps={{
          loading: state?.isLoadingBtnScrape,
          disabled: state?.isLoadingBtnScrape,
        }}
        onSuccessAction={() => {
          navigate("/dosen");
        }}
      >
        <DosenScrapeInput
          label="Masukkan NIP"
          name="nip"
          endpoint="scrapeSIPEG"
          scrapeType="Sipeg"
        />
        <DosenScrapeInput
          label="Masukkan Link Google Scholar"
          name="gs_url"
          endpoint="scrapeGS"
          scrapeType="GS"
        />

        {state?.isShowPreviewScrape ? (
          <Fragment>
            <Divider orientation="center">Preview</Divider>
            <DosenFields />
          </Fragment>
        ) : (
          <IllustrasiSidos
            src={APIIllustrate}
            subTitle="Masukkan link untuk menampilkan informasi"
          />
        )}
      </FormSidos>
    </DosenAddGetFromLinkContext.Provider>
  );
};
export default DosenAddGetFromLink;

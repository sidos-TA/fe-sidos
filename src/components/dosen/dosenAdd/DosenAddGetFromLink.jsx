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
import isValidLinkPenelitian from "../../../lib/src/helpers/isValidLinkPenelitian";

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

  const endPointLinkHandler = () => {
    const linkVal = FormScrape?.getFieldValue("link");
    if (linkVal && isValidLinkPenelitian({ source_link: linkVal })) {
      const url = new URL(linkVal);
      if (url?.hostname.includes("sinta.kemdikbud")) {
        return "scrapeSINTA";
      } else {
        return "scrapeGS";
      }
    }
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
        beforeSubmit={() => ({
          ...FormScrape?.getFieldsValue(),
          linkDataPenelitian: FormScrape?.getFieldValue("link"),
        })}
        BtnSubmitProps={{
          disabled: !FormScrape?.getFieldValue("penelitian")?.length,
        }}
        afterMessageActionClose={() => {
          navigate("/dosen");
        }}
      >
        <DosenScrapeInput
          label="Masukkan NIP"
          name="nip"
          payloadType="nip"
          endpoint="scrapeSIPEG"
          scrapeType="Sipeg"
        />
        <DosenScrapeInput
          label="Masukkan Link Google Scholar / SINTA"
          name="link"
          payloadType="link"
          endpoint={endPointLinkHandler()}
          scrapeType="GS"
          onChange={(val) => {
            FormScrape?.setFieldsValue({
              link: val,
            });
          }}
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

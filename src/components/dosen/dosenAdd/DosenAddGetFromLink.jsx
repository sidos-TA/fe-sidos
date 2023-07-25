import { Divider } from "antd";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useTabsContext } from "../../../context/TabsContext";
import FormSidos from "../../../lib/src/components/FormSidos/form/FormSidos";
import LoadingSidos from "../../../lib/src/components/LoadingSidos";
import TitleSection from "../../TitleSection";
import DosenForm from "./DosenForm";
import ScrapeInput from "./ScrapeInput";

const DosenAddGetFromLink = () => {
  const { FormScrape, state } = useTabsContext();
  const navigate = useNavigate();

  return (
    <Fragment>
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
        onSubmitSuccess={() => {
          navigate("/dosen");
        }}
      >
        <ScrapeInput label="Masukkan NIP" name="nip" endpoint="scrapeSIPEG" />
        <ScrapeInput
          label="Masukkan Link Google Scholar"
          name="gs_url"
          endpoint="scrapeGS"
        />

        {state?.isShowPreviewScrape && (
          <Fragment>
            <Divider orientation="center">Preview</Divider>
            {state?.isLoadingBtnScrape ? (
              <LoadingSidos />
            ) : (
              <DosenForm formInstance={FormScrape} />
            )}
          </Fragment>
        )}
      </FormSidos>
    </Fragment>
  );
};
export default DosenAddGetFromLink;

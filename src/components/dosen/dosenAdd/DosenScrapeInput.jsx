import { Col, message, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useDosenAddGetFromLinkContext } from "../../../context/Dosen/DosenAdd/DosenAddGetFromLinkContext";
import BtnSidos from "../../../lib/src/components/BtnSidos";
import Field from "../../../lib/src/components/FormSidos/fields/Field";
import catchHandler from "../../../lib/src/helpers/catchHandler";
import { responseSuccess } from "../../../lib/src/helpers/formatRespons";
import useFetch from "../../../lib/src/helpers/useFetch";

const DosenScrapeInput = ({
  label,
  name,
  payload,
  endpoint,
  scrapeType,
  ...props
}) => {
  const { FormScrape, loadingScrapeStateHandler, state, setState } =
    useDosenAddGetFromLinkContext();

  const navigate = useNavigate();
  let timeout;

  const fetch = useFetch();
  const [messageApi, contextHolder] = message.useMessage();

  const scrapeHandler = () => {
    loadingScrapeStateHandler({ scrapeType, loadingValue: true });
    fetch({
      endpoint,
      payload,
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res?.status === 200) {
          setState((prev) => ({ ...prev, isShowPreviewScrape: true }));

          FormScrape?.setFieldsValue({
            ...res?.data,
          });
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      })
      ?.finally(() => {
        window.scrollTo(0, 400);

        loadingScrapeStateHandler({ scrapeType, loadingValue: false });
      });
  };
  return (
    <>
      {contextHolder}
      <Row justify="center" align="middle" gutter={8} style={{ width: "100%" }}>
        <Col span={12} style={{ width: "100%" }}>
          <Field type="text" label={label} name={name} {...props} />
        </Col>
        <Col span={12}>
          <BtnSidos
            loading={state?.isLoadingBtnScrape?.[scrapeType]}
            disabled={state?.isLoadingBtnScrape?.[scrapeType]}
            position="center"
            type="dashed"
            onClick={() => {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                scrapeHandler();
              }, 300);
            }}
          >
            Get Data
          </BtnSidos>
        </Col>
      </Row>
    </>
  );
};

export default DosenScrapeInput;

import { InfoOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Row, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDosenAddGetFromLinkContext } from "../../../context/Dosen/DosenAdd/DosenAddGetFromLinkContext";
import BtnSidos from "../../../lib/src/components/BtnSidos";
import Field from "../../../lib/src/components/FormSidos/fields/Field";
import SmallTextSidos from "../../../lib/src/components/SmallTextSidos";
import catchHandler from "../../../lib/src/helpers/catchHandler";
import { responseSuccess } from "../../../lib/src/helpers/formatRespons";
import useFetch from "../../../lib/src/helpers/useFetch";

const DosenScrapeInput = ({
  label,
  name,
  payloadType,
  scrapeType,
  ...props
}) => {
  const { FormScrape, loadingScrapeStateHandler, state, setState } =
    useDosenAddGetFromLinkContext();

  const [visibleModal, setVisibleModal] = useState(false);

  const navigate = useNavigate();

  const fetch = useFetch();
  const [messageApi, contextHolder] = message.useMessage();

  const toggleVisibleModal = (isVisible) => setVisibleModal(isVisible);

  const endPointLinkHandler = () => {
    const linkVal = FormScrape?.getFieldValue("link");
    const nipLinkVal = FormScrape?.getFieldValue("nip");

    if (payloadType === "link" && linkVal) {
      const url = new URL(linkVal);
      if (url) {
        if (url?.hostname.includes("sinta.kemdikbud")) {
          return "scrapeSINTA";
        } else {
          return "scrapeGS";
        }
      } else {
        messageApi?.open({
          type: "error",
          content: "Mohon direfresh, terdapat kesalahan",
        });
      }
    } else if (payloadType === "nip" && nipLinkVal) {
      return "scrapeSIPEG";
    } else {
      messageApi?.open({
        type: "error",
        content: "Field masih kosong, mohon diisi",
      });
      return "";
    }
  };

  const scrapeHandler = () => {
    loadingScrapeStateHandler({ scrapeType, loadingValue: true });

    fetch({
      endpoint: endPointLinkHandler(),
      payload: {
        [payloadType]: FormScrape?.getFieldValue(payloadType),
      },
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
        <Col span={payloadType === "link" ? 10 : 12} style={{ width: "100%" }}>
          <Field type="text" label={label} name={name} {...props} />
        </Col>

        {payloadType === "link" && (
          <Col span={2}>
            <Button
              icon={<InfoOutlined />}
              shape="circle"
              onClick={() => toggleVisibleModal(true)}
            />
          </Col>
        )}
        <Col span={12}>
          <BtnSidos
            loading={state?.isLoadingBtnScrape?.[scrapeType]}
            disabled={state?.isLoadingBtnScrape?.[scrapeType]}
            position="center"
            type="dashed"
            onClick={() => {
              scrapeHandler();
            }}
          >
            Get Data
          </BtnSidos>
        </Col>
      </Row>

      <Modal
        title="Petunjuk link scrape"
        open={visibleModal}
        onCancel={() => toggleVisibleModal(false)}
      >
        <Row gutter={8}>
          <Col span={24}>
            <Typography.Title level={4}>
              1. Link Google Scholar
            </Typography.Title>
            <SmallTextSidos>Contoh : </SmallTextSidos>
            <Typography.Link
              href="https://scholar.google.co.id/citations?user=sBMUB_oAAAAJ&hl=en"
              target="_blank"
            >
              https://scholar.google.co.id/citations?user=sBMUB_oAAAAJ&hl=en
            </Typography.Link>
          </Col>
          <Col span={24}>
            <Typography.Title level={4}>2. Link SINTA</Typography.Title>
            <SmallTextSidos>Contoh : </SmallTextSidos>
            <Typography.Link
              href="https://sinta.kemdikbud.go.id/authors/profile/5975873"
              target="_blank"
            >
              https://sinta.kemdikbud.go.id/authors/profile/5975873
            </Typography.Link>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default DosenScrapeInput;

import { Col, message, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDosenAddGetFromLinkContext } from "../../../context/Dosen/DosenAdd/DosenAddGetFromLinkContext";
import { useTabsContext } from "../../../context/TabsContext";
import BtnSidos from "../../../lib/src/components/BtnSidos";
import Field from "../../../lib/src/components/FormSidos/fields/Field";
import InputSidos from "../../../lib/src/components/FormSidos/fields/InputSidos";
import deleteCookie from "../../../lib/src/helpers/deleteCookie";
import {
  responseError,
  responseSuccess,
  unAuthResponse,
} from "../../../lib/src/helpers/formatRespons";
import useFetch from "../../../lib/src/helpers/useFetch";

const DosenScrapeInput = ({ label, name, endpoint, scrapeType }) => {
  const { FormScrape, loadingScrapeStateHandler, state, setState } =
    useDosenAddGetFromLinkContext();

  let timeout;
  const navigate = useNavigate();

  const fetch = useFetch();
  const [messageApi, contextHolder] = message.useMessage();

  const scrapeHandler = () => {
    loadingScrapeStateHandler({ scrapeType, loadingValue: true });
    fetch({
      endpoint,
      payload: {
        [name]: FormScrape?.getFieldValue(name)?.replaceAll(" ", ""),
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
        const err = responseError(e);
        if (err?.status === 401) {
          unAuthResponse({ messageApi, err });
        } else {
          messageApi.open({
            type: "error",
            key: "errMsg",
            content: err?.error,
          });
        }
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
          <Field type="text" label={label} name={name} />
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

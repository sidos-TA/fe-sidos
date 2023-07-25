import { Col, message, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTabsContext } from "../../../context/TabsContext";
import BtnSidos from "../../../lib/src/components/BtnSidos";
import InputSidos from "../../../lib/src/components/FormSidos/fields/InputSidos";
import deleteCookie from "../../../lib/src/helpers/deleteCookie";
import {
  responseError,
  responseSuccess,
  unAuthResponse,
} from "../../../lib/src/helpers/formatRespons";
import useFetch from "../../../lib/src/helpers/useFetch";

const ScrapeInput = ({ label, name, endpoint }) => {
  const { FormScrape, setState } = useTabsContext();
  let timeout;
  const navigate = useNavigate();

  const fetch = useFetch();
  const [messageApi, contextHolder] = message.useMessage();

  const scrapeHandler = () => {
    setState((prev) => ({ ...prev, isLoadingBtnScrape: true }));
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
        unAuthResponse({ messageApi, err });

        messageApi.open({
          type: "error",
          key: "errMsg",
          content: err?.error,
        });
      })
      ?.finally(() => {
        setState((prev) => ({
          ...prev,
          isLoadingBtnScrape: false,
        }));
      });
  };
  return (
    <>
      {contextHolder}
      <Row justify="center" align="middle" gutter={8} style={{ width: "100%" }}>
        <Col span={12} style={{ width: "100%" }}>
          <InputSidos
            formItemObj={{ wrapperCol: { span: 24 } }}
            label={label}
            name={name}
          />
        </Col>
        <Col span={12}>
          <BtnSidos
            // loading={state?.isLoadingBtnScrape}
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

export default ScrapeInput;

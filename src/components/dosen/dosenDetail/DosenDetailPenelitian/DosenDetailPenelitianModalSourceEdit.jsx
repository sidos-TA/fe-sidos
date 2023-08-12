import { InfoOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useTabsContext } from "../../../../context/TabsContext";
import Field from "../../../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../../../lib/src/components/FormSidos/form/FormSidos";
import basePathName from "../../../../lib/src/constants/basePathName";
import isValidLinkPenelitian from "../../../../lib/src/helpers/isValidLinkPenelitian";
import DosenAddModalHintScrape from "../../dosenAdd/DosenAddModalHintScrape";

const DosenDetailPenelitianModalSourceEdit = ({
  visibleModal,
  setVisibleModal,
  form,
  reScrapeHandler,
}) => {
  const { state, setState } = useTabsContext();
  const [modalApi, contextHolderModal] = Modal.useModal();
  const navigate = useNavigate();

  const [visibleModalHint, setVisibleModalHint] = useState(false);

  const toggleVisibleModalHint = (isVisibleModalHint) =>
    setVisibleModalHint(isVisibleModalHint);

  return (
    <Fragment>
      {contextHolderModal}
      <Modal
        title="Edit Sumber Penelitian"
        open={visibleModal}
        footer={false}
        onCancel={() => setVisibleModal(false)}
        destroyOnClose
      >
        <FormSidos
          endpoint="getSourcePenelitian"
          submitEndpoint="updateSourcePenelitian"
          form={form}
          payloadFetch={{
            nip: state?.datas?.nip,
          }}
          payloadSubmit={{
            nip: state?.datas?.nip,
          }}
          customFetch={(formData) => {
            form?.setFieldValue("source_link", formData?.linkDataPenelitian);
          }}
          afterMessageActionClose={() => {
            modalApi.confirm({
              onOk: () => {
                reScrapeHandler(form?.getFieldValue("source_link"));
                setVisibleModal(false);
                setState((prev) => ({
                  ...prev,
                  linkDataPenelitian: form?.getFieldValue("source_link"),
                }));
              },
              onCancel: () => navigate(basePathName),
              closable: false,
              content: "Apakah mau scrape ulang ke link yang terbaru ?",
            });
          }}
        >
          <Row gutter={8} align="middle">
            <Col span={22}>
              <Field
                required
                rules={[
                  {
                    validator: (_, value) => {
                      if (isValidLinkPenelitian({ source_link: value })) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          new Error(
                            "Link yang diberikan bukan google scholar maupun sinta.kemendikbud"
                          )
                        );
                      }
                    },
                  },
                ]}
                type="text"
                name="source_link"
                label="Sumber Penelitian"
                onChange={(val) => {
                  form?.setFieldValue("source_link", val);
                }}
                formItemObj={{
                  wrapperCol: {
                    span: 24,
                  },
                }}
              />
            </Col>
            <Col span={2}>
              <Button
                shape="circle"
                icon={<InfoOutlined />}
                onClick={() => toggleVisibleModalHint(true)}
              />
            </Col>
          </Row>
        </FormSidos>
      </Modal>

      <DosenAddModalHintScrape
        visibleModal={visibleModalHint}
        toggleVisibleModal={toggleVisibleModalHint}
      />
    </Fragment>
  );
};
export default DosenDetailPenelitianModalSourceEdit;

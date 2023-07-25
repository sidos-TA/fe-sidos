import { Col, Modal, Row, Space, Typography } from "antd";
import { useState } from "react";
import { useTabsContext } from "../../../../context/TabsContext";
import BtnSidos from "../../../../lib/src/components/BtnSidos";
import LabelSidos from "../../../../lib/src/components/FormSidos/fields/LabelSidos";
import UploadSidos from "../../../../lib/src/components/FormSidos/fields/UploadSidos";
import ImageSidos from "../../../../lib/src/components/ImageSidos";
import { fallbackImage } from "../../../../lib/src/constants";

const ModalPerResult = ({ modalState, setModalState }) => {
  const [state, setState] = useState({
    profileIdentity: {},
    previewImg: fallbackImage,
  });

  const updateField = ({ field, val }) => {
    setState((prev) => ({
      ...prev,
      profileIdentity: {
        ...state?.profileIdentity,
        [field]: val,
      },
    }));
  };
  return (
    <Modal
      width={1000}
      open={modalState?.visible}
      onCancel={() => {
        setModalState((prev) => ({
          ...prev,
          visible: false,
        }));
      }}
      footer={null}
    >
      <Row justify="space-around" align="middle">
        <Col>
          <Space direction="vertical" size={32}>
            <LabelSidos
              isEditable
              label="Name"
              onChange={(val) => {
                updateField({ field: "name", val });
              }}
            >
              {state?.profileIdentity?.name || modalState?.data?.name}
            </LabelSidos>
            <LabelSidos
              label="NIP"
              isEditable
              onChange={(val) => {
                updateField({ field: "nip", val });
              }}
            >
              {state?.profileIdentity?.nip || modalState?.data?.nip}
            </LabelSidos>
            <LabelSidos
              label="Jabatan"
              isEditable
              onChange={(val) => {
                updateField({ field: "jabatan", val });
              }}
            >
              {state?.profileIdentity?.jabatan || modalState?.data?.jabatan}
            </LabelSidos>
            <LabelSidos
              label="Pendidikan"
              isEditable
              onChange={(val) => {
                updateField({ field: "pendidikan", val });
              }}
            >
              {state?.profileIdentity?.pendidikan ||
                modalState?.data?.pendidikan}
            </LabelSidos>
            <LabelSidos
              label="SKS"
              isEditable
              onChange={(val) => {
                updateField({ field: "sks", val });
              }}
            >
              {state?.profileIdentity?.sks || modalState?.data?.sks}
            </LabelSidos>
          </Space>
        </Col>
        <Col>
          <Space
            direction="vertical"
            size="small"
            style={{ textAlign: "center" }}
          >
            <ImageSidos src={state?.previewImg} />
            <Space>
              <UploadSidos
                // handleChange={handleChange}
                showUploadList={false}
                isImage
              >
                <BtnSidos>Upload</BtnSidos>
              </UploadSidos>
              {state?.previewImg !== fallbackImage && (
                <BtnSidos
                  danger
                  type="dashed"
                  // onClick={deleteHandler}
                >
                  Delete
                </BtnSidos>
              )}
            </Space>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};
export default ModalPerResult;

import { Col, Row, Space } from "antd";
import { useState } from "react";
import { Fragment } from "react";
import { useTabsContext } from "../../../context/TabsContext";
import BtnSidos from "../../../lib/src/components/BtnSidos";
import LabelSidos from "../../../lib/src/components/FormSidos/fields/LabelSidos";
import UploadSidos from "../../../lib/src/components/FormSidos/fields/UploadSidos";
import ImageSidos from "../../../lib/src/components/ImageSidos";
import { fallbackImage } from "../../../lib/src/constants";
import TitleSection from "../../TitleSection";

const ProfileDosen = () => {
  const { state: stateTabs } = useTabsContext();

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
    <Fragment>
      <TitleSection title="Profile" />
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
              {state?.profileIdentity?.name || stateTabs?.datas?.name}
            </LabelSidos>
            <LabelSidos
              label="NIP"
              isEditable
              onChange={(val) => {
                updateField({ field: "nip", val });
              }}
            >
              {state?.profileIdentity?.nip || stateTabs?.datas?.nip}
            </LabelSidos>
            <LabelSidos
              label="Jabatan"
              isEditable
              onChange={(val) => {
                updateField({ field: "jabatan", val });
              }}
            >
              {state?.profileIdentity?.jabatan || stateTabs?.datas?.jabatan}
            </LabelSidos>
            <LabelSidos
              label="Pendidikan"
              isEditable
              onChange={(val) => {
                updateField({ field: "pendidikan", val });
              }}
            >
              {state?.profileIdentity?.pendidikan ||
                stateTabs?.datas?.pendidikan}
            </LabelSidos>
            {/*
            <Typography.Text>{stateData?.datas?.prodi}</Typography.Text>
            <Typography.Text>{stateData?.datas?.tingkatan}</Typography.Text> */}
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
    </Fragment>
  );
};

export default ProfileDosen;

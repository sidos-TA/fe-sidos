import { Col, Image, Row, Space, Typography } from "antd";
import { Fragment, useState } from "react";
import BtnSidos from "../../../lib/src/components/BtnSidos";
import TitleSection from "../../../components/TitleSection";
import { useTabsContext } from "../../../context/TabsContext";
import UploadSidos from "../../../lib/src/components/FormSidos/fields/UploadSidos";
import getBase64 from "../../../lib/src/helpers/getBase64";
import { fallbackImage } from "../../../lib/src/constants";
import ImageSidos from "../../../lib/src/components/ImageSidos";
import getBlobUrl from "../../../lib/src/helpers/getBlobUrl";

const Profile = () => {
  const { state: stateData } = useTabsContext();
  const [state, setState] = useState({
    previewImg: fallbackImage,
    profileIdentity: {},
  });

  const handleChange = async ({ file }) => {
    const blobUrl = await getBlobUrl(file?.originFileObj);
    setState((prev) => ({
      ...prev,
      previewImg: blobUrl,
    }));
  };

  const deleteHandler = () => {
    setState((prev) => ({
      ...prev,
      previewImg: fallbackImage,
    }));
  };

  return (
    <Fragment>
      <TitleSection title="Profil" />
      <Row justify="space-around" align="middle">
        <Col>
          <Space direction="vertical" size={32}>
            <Typography.Text
              editable={{
                tooltip: "Click to edit name",
                triggerType: "icon",
                onChange: (val) => {
                  setState((prev) => ({
                    ...prev,
                    profileIdentity: {
                      ...state?.profileIdentity,
                      name: val,
                    },
                  }));
                },
              }}
            >
              {state?.profileIdentity?.name || stateData?.datas?.name}
            </Typography.Text>
            <Typography.Text>{stateData?.datas?.no_bp}</Typography.Text>
            <Typography.Text>{stateData?.datas?.prodi}</Typography.Text>
            <Typography.Text>{stateData?.datas?.tingkatan}</Typography.Text>
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
              <UploadSidos handleChange={handleChange} showUploadList={false}>
                <BtnSidos>Upload</BtnSidos>
              </UploadSidos>
              {state?.previewImg !== fallbackImage && (
                <BtnSidos danger type="dashed" onClick={deleteHandler}>
                  Delete
                </BtnSidos>
              )}
            </Space>
          </Space>
        </Col>
      </Row>
      <BtnSidos position="center" type="primary">
        Update
      </BtnSidos>
    </Fragment>
  );
};

export default Profile;

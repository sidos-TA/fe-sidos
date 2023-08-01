import { Modal, Space } from "antd";
import { useState } from "react";
import jabatanList from "../../../constants/jabatanList";
import pendidikanList from "../../../constants/pendidikanList";
import LabelSidos from "../../../lib/src/components/FormSidos/fields/LabelSidos";

const DosenAddModalUploadFile = ({
  state,
  setState,
  modalState,
  setModalState,
}) => {
  const [profileIdentity, setProfileIdentity] = useState({});

  const updateField = ({ field, val }) => {
    setProfileIdentity({
      ...profileIdentity,
      [field]: val,
    });
  };

  const updateDataHandler = () => {
    const selectData = state?.arrDatasFiles?.find(
      (data) => data?.id === modalState?.data?.id
    );

    const arrKeysSelectData = Object.keys(selectData);
    const newSelectData = {};

    arrKeysSelectData?.forEach((key) => {
      newSelectData[key] = profileIdentity?.[key] || modalState?.data?.[key];
    });

    setState((prev) => ({
      ...prev,
      arrDatasFiles: state?.arrDatasFiles?.map((data) => {
        if (data?.id === modalState?.data?.id) {
          return newSelectData;
        }
        return data;
      }),
    }));
  };

  const clearState = () => {
    setModalState((prev) => ({
      ...prev,
      visible: false,
      data: {},
    }));
    setProfileIdentity({});
  };

  // console.log(state?.arrDatasFiles);

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title={`Informasi - ${profileIdentity?.name || modalState?.data?.name}`}
      onOk={() => {
        updateDataHandler();
        clearState();
      }}
      open={modalState?.visible}
      onCancel={() => {
        clearState();
        setProfileIdentity({});
      }}
      okText="Update"
    >
      <Space direction="vertical">
        <LabelSidos
          isEditable
          type="text"
          label="Name"
          defaultValue={profileIdentity?.name || modalState?.data?.name}
          onChange={(val) => {
            updateField({ field: "name", val });
          }}
        >
          {profileIdentity?.name || modalState?.data?.name}
        </LabelSidos>
        <LabelSidos
          type="text"
          label="NIP"
          isEditable
          defaultValue={profileIdentity?.nip || modalState?.data?.nip}
          onChange={(val) => {
            updateField({ field: "nip", val });
          }}
        >
          {profileIdentity?.nip || modalState?.data?.nip}
        </LabelSidos>
        <LabelSidos
          type="select"
          listOptions={jabatanList}
          label="Jabatan"
          isEditable
          defaultValue={profileIdentity?.jabatan || modalState?.data?.jabatan}
          onChange={(val) => {
            updateField({ field: "jabatan", val });
          }}
        >
          {profileIdentity?.jabatan || modalState?.data?.jabatan}
        </LabelSidos>
        <LabelSidos
          label="Pendidikan"
          listOptions={pendidikanList}
          type="text"
          defaultValue={
            profileIdentity?.pendidikan || modalState?.data?.pendidikan
          }
          isEditable
          onChange={(val) => {
            updateField({ field: "pendidikan", val });
          }}
        >
          {profileIdentity?.pendidikan || modalState?.data?.pendidikan}
        </LabelSidos>
        <LabelSidos
          label="SKS"
          isEditable
          type="number"
          defaultValue={profileIdentity?.sks || modalState?.data?.sks}
          onChange={(val) => {
            updateField({ field: "sks", val });
          }}
        >
          {profileIdentity?.sks || modalState?.data?.sks}
        </LabelSidos>
      </Space>
    </Modal>
  );
};
export default DosenAddModalUploadFile;

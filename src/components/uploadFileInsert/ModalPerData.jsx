import { Form, Modal, Space } from "antd";
import { useState } from "react";
import LabelSidos from "../../lib/src/components/FormSidos/fields/LabelSidos";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";

const ModalPerData = ({
  state,
  setState,
  modalState,
  setModalState,
  listOptionsSelectField,
  endpointSelectField,
  selectValueSelectField,
  selectLabelSelectField,
  pKey,
}) => {
  const [profileIdentity, setProfileIdentity] = useState({});

  const [FormModalEdit] = Form.useForm();

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

  //   console.log("modal : ", modalState, state);

  // console.log(state?.arrDatasFiles);

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title="Informasi Detail"
      onOk={() => {
        FormModalEdit?.validateFields()?.then(() => {
          updateDataHandler();
          clearState();
        });
      }}
      open={modalState?.visible}
      onCancel={() => {
        clearState();
        setProfileIdentity({});
      }}
      okText="Update"
    >
      <FormSidos form={FormModalEdit}>
        <Space direction="vertical">
          {Object.keys(modalState?.data)
            ?.filter((keyModalData) => keyModalData !== "id")
            ?.map((keyData, idx) => {
              const type = state?.objDataFileType?.[keyData];

              return (
                <LabelSidos
                  key={idx + 1}
                  isEditable
                  required
                  name={keyData}
                  type={type}
                  {...(type === "select" && {
                    listOptions: listOptionsSelectField?.[keyData],
                    endpoint: endpointSelectField?.[keyData],
                    ...(endpointSelectField?.[keyData] && {
                      selectValue: selectValueSelectField?.[keyData],
                      selectLabel: selectLabelSelectField?.[keyData],
                    }),
                  })}
                  label={keyData}
                  defaultValue={
                    profileIdentity?.[keyData] || modalState?.data?.[keyData]
                  }
                  onChange={(val) => {
                    updateField({ field: keyData, val });
                  }}
                  {...(pKey &&
                    keyData === pKey && {
                      rules: [
                        {
                          validator: (_, value) => {
                            if (
                              state?.arrDatasFiles?.some(
                                (data) => String(data?.[pKey]) === String(value)
                              )
                            ) {
                              return Promise.reject(
                                new Error(`${pKey} telah ada`)
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ],
                    })}
                >
                  {profileIdentity?.[keyData] || modalState?.data?.[keyData]}
                </LabelSidos>
              );
            })}
        </Space>
      </FormSidos>
    </Modal>
  );
};
export default ModalPerData;

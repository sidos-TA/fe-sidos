import { Form, Modal } from "antd";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import sortedArrObj from "../../lib/src/helpers/sortedArrObj";

const ModalAddData = ({
  openModalAdd,
  setOpenModalAdd,
  state,
  setState,
  listOptionsSelectField,
  endpointSelectField,
  selectValueSelectField,
  selectLabelSelectField,
  pKey,
}) => {
  const [FormAdd] = Form.useForm();
  const arrFields = state?.arrDatasFiles?.length
    ? Object.keys(state?.arrDatasFiles?.[0])?.filter((data) => data !== "id")
    : [];

  return (
    <Modal
      title="Tambah data mahasiswa"
      okText="Tambah"
      onCancel={() => {
        setOpenModalAdd(false);
      }}
      open={openModalAdd}
      destroyOnClose
      onOk={() => {
        FormAdd.validateFields()?.then(() => {
          const sortedArrDataFiles = sortedArrObj({
            arrDatas: state.arrDatasFiles,
            key: "id",
          });

          const idData =
            sortedArrDataFiles?.[sortedArrDataFiles?.length - 1]?.id;

          setState((prev) => ({
            ...prev,
            arrDatasFiles: [
              ...sortedArrDataFiles,
              { ...FormAdd?.getFieldsValue(), id: idData + 1 },
            ],
          }));
          setOpenModalAdd(false);

          FormAdd.resetFields();
        });
      }}
    >
      <FormSidos form={FormAdd}>
        {arrFields?.map((keyData, idx) => {
          const type = state?.objDataFileType[keyData];
          return (
            <Field
              required
              type={type}
              name={keyData}
              key={idx}
              label={keyData}
              {...(type === "select" && {
                listOptions: listOptionsSelectField?.[keyData],
                endpoint: endpointSelectField?.[keyData],
                ...(endpointSelectField?.[keyData] && {
                  selectValue: selectValueSelectField?.[keyData],
                  selectLabel: selectLabelSelectField?.[keyData],
                }),
              })}
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
                          return Promise.reject(new Error(`${pKey} telah ada`));
                        }
                        return Promise.resolve();
                      },
                    },
                  ],
                })}
            />
          );
        })}
      </FormSidos>
    </Modal>
  );
};
export default ModalAddData;

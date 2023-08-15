import { Form, Modal } from "antd";
import { useTabsContext } from "../../../../context/TabsContext";
import Field from "../../../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../../../lib/src/components/FormSidos/form/FormSidos";
import isUrl from "../../../../lib/src/helpers/isUrl";

const DosenDetailPenelitianModalAdd = ({
  toggleVisibleModalAdd,
  visibleModalAdd,
}) => {
  const [FormPenelitian] = Form.useForm();

  const { state, setState } = useTabsContext();

  return (
    <Modal
      title="Add Penelitian"
      open={visibleModalAdd}
      onCancel={() => toggleVisibleModalAdd(false)}
      destroyOnClose
      footer={false}
    >
      <FormSidos
        form={FormPenelitian}
        afterMessageActionClose={(formData) => {
          const data = formData?.data;

          setState((prev) => ({
            ...prev,
            datas: {
              ...state?.datas,
              penelitians: data,
            },
          }));
          toggleVisibleModalAdd(false);
        }}
        submitEndpoint="addPenelitian"
        payloadSubmit={{
          ...FormPenelitian?.getFieldsValue(),
          nip: state?.datas?.nip,
        }}
      >
        <Field
          type="text"
          required
          name="judulPenelitian"
          label="Judul Penelitian"
        />
        <Field
          type="text"
          required
          name="link"
          label="Link Penelitian"
          rules={[
            {
              validator: (_, value) => {
                if (isUrl(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error("Ini bukan link"));
                }
              },
            },
          ]}
        />
        <Field type="text" required name="tahun" label="Tahun" />
      </FormSidos>
    </Modal>
  );
};
export default DosenDetailPenelitianModalAdd;

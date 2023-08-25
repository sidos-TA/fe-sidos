import { Form, Modal } from "antd";
import { useTabsContext } from "../../../../context/TabsContext";
import Field from "../../../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../../../lib/src/components/FormSidos/form/FormSidos";

const DosenDetailPenelitianModalEdit = ({
  modalEditState,
  toggleVisibleModalEdit,
}) => {
  const { state, setState } = useTabsContext();
  const [FormPenelitian] = Form.useForm();

  return (
    <Modal
      title="Edit Penelitian"
      open={modalEditState?.visible}
      onCancel={() => toggleVisibleModalEdit(false)}
      destroyOnClose
      footer={false}
    >
      <FormSidos
        form={FormPenelitian}
        endpoint="getPenelitianById"
        payloadFetch={{
          id: modalEditState?.data?.id,
          nip: state?.datas?.nip,
        }}
        afterMessageActionClose={(formData) => {
          const data = formData?.data;

          setState((prev) => ({
            ...prev,
            datas: {
              ...state?.datas,
              penelitians: data,
            },
          }));
          toggleVisibleModalEdit(false);
        }}
        submitEndpoint="editPenelitian"
        payloadSubmit={{
          id: modalEditState?.data?.id,
          nip: state?.datas?.nip,
        }}
      >
        <Field
          type="textarea"
          name="judulPenelitian"
          label="Judul Penelitian"
        />
        <Field type="text" name="link" label="Link" />
        <Field type="text" name="tahun" label="Tahun" />
      </FormSidos>
    </Modal>
  );
};
export default DosenDetailPenelitianModalEdit;

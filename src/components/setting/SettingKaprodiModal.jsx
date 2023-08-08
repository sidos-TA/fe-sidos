import { Form, Modal } from "antd";
import { useState } from "react";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import deleteCookie from "../../lib/src/helpers/deleteCookie";

const SettingKaprodiModal = ({ openState, openHandler }) => {
  const [FormKaprodi] = Form.useForm();
  const [arrTargetKeys, setArrTargetKeys] = useState([]);

  return (
    <Modal
      title="Update Kaprodi"
      onCancel={() => openHandler(false)}
      open={openState}
      footer={false}
    >
      <FormSidos
        form={FormKaprodi}
        submitEndpoint="updateKaprodi"
        submitText="Update Kaprodi"
        afterMessageActionClose={() => {
          deleteCookie("token");
          window.location.href = "/login";
        }}
      >
        <Field
          type="transfer"
          name="kaprodi"
          label="Kaprodi"
          endpoint="getAllDosen"
          payload={{
            usePaginate: false,
            showRoles: true,
          }}
          arrTargetKeys={arrTargetKeys}
          selectLabel="name"
          selectValue="nip"
          customFetch={(arrDatas) => {
            setArrTargetKeys(
              arrDatas
                ?.filter((data) => data?.roles && data?.roles === 1)
                ?.map((data) => data?.nip)
            );
          }}
        />
      </FormSidos>
    </Modal>
  );
};
export default SettingKaprodiModal;

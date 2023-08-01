import { Form, Modal } from "antd";
import { useCallback } from "react";
import { useDosenDetailProfileContext } from "../../../../context/Dosen/DosenDetail/DosenDetailProfileContext";
import Field from "../../../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../../../lib/src/components/FormSidos/form/FormSidos";
import decodeCookie from "../../../../lib/src/helpers/decodeCookie";

const DosenDetailProfileModal = () => {
  const { state, toggleModalPassword } = useDosenDetailProfileContext();
  const { nip } = decodeCookie("token");

  const [FormPassword] = Form.useForm();

  return (
    <Modal
      title="Password"
      open={state.isVisibleModalPassword}
      onCancel={() => toggleModalPassword(false)}
      okText="Update Password"
      footer={false}
    >
      <FormSidos
        form={FormPassword}
        payload={{
          nip,
        }}
        submitEndpoint="change_password"
        afterMessageActionClose={() => {
          toggleModalPassword(false);
        }}
      >
        <Field
          name="old_password"
          type="text"
          isPassword
          label="Password Lama"
        />
        <Field
          name="new_password"
          type="text"
          isPassword
          label="Password Baru"
        />
        <Field
          name="confirm_password"
          type="text"
          isPassword
          formItemObj={{
            rules: [
              () => ({
                validator(_, value) {
                  if (value === FormPassword?.getFieldValue("new_password")) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Password tidak sama"));
                },
              }),
            ],
          }}
          label="Konfirmasi Password"
        />
      </FormSidos>
    </Modal>
  );
};
export default DosenDetailProfileModal;

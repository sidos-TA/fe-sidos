import { Form } from "antd";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import setCookie from "../../lib/src/helpers/setCookie";

const Login = () => {
  const [form] = Form.useForm();
  return (
    <Fragment>
      <TitlePage title="Login" />
      <FormSidos
        submitText="Login"
        form={form}
        submitEndpoint="login"
        afterSubmitHandler={(response) => {
          setCookie("token", response?.token, 60);
        }}
        onSubmitSuccess={() => {
          window.location.href = "/";
          // navigate("/");
        }}
      >
        <InputSidos required name="username" label="Username/No. BP" />
        <InputSidos type="password" required name="password" label="Password" />
      </FormSidos>
    </Fragment>
  );
};
export default Login;

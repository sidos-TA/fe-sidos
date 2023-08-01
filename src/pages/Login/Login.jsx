import { Form } from "antd";
import { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import Field from "../../lib/src/components/FormSidos/fields/Field";
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
        afterMessageActionClose={(response) => {
          setCookie("token", response?.token);
          const currRoute = sessionStorage.getItem("currRoute");
          if (currRoute) {
            window.location.href = currRoute;
          } else {
            window.location.href = "/";
          }
        }}
      >
        <Field type="text" required name="username" label="Username/No. BP" />
        <Field
          type="text"
          InputSidos
          isPassword
          required
          name="password"
          label="Password"
        />
      </FormSidos>
    </Fragment>
  );
};
export default Login;

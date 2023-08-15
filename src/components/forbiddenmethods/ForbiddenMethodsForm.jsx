import { Col, Form, message, Row } from "antd";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import semesterList from "../../constants/semesterList";
import tingkatanProdiList from "../../constants/tingkatanProdiList";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import catchHandler from "../../lib/src/helpers/catchHandler";
import { responseSuccess } from "../../lib/src/helpers/formatRespons";
import isStringParseArray from "../../lib/src/helpers/isStringParseArray";
import useFetch from "../../lib/src/helpers/useFetch";

const ForbiddenMethodsForm = ({
  submitEndpoint,
  endpoint,
  deleteEndpoint,
  id,
}) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const fetch = useFetch();
  const [messageApi, contextHolderMsg] = message.useMessage();

  const getSetting = () => {
    fetch({
      endpoint: "getSetting",
    })
      ?.then((response) => {
        const res = responseSuccess(response);

        if (res?.status === 200) {
          form.setFieldsValue({
            tahun: res?.data?.tahun,
            semester: res?.data?.semester,
          });
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      });
  };

  useEffect(() => {
    getSetting();
  }, []);
  return (
    <Fragment>
      {contextHolderMsg}
      <FormSidos
        form={form}
        submitEndpoint={submitEndpoint}
        payloadSubmit={{ id }}
        afterMessageActionClose={() => {
          navigate("/forbidden_methods");
        }}
        customFetch={(formData) => {
          if (formData) {
            form?.setFieldsValue(formData);
          } else {
            navigate("/forbidden_methods");
          }
        }}
        {...(endpoint && { endpoint, payloadFetch: { id } })}
        {...(deleteEndpoint && { deleteEndpoint, payloadDelete: { id } })}
      >
        <Field name="methodName" label="Nama Metode" type="text" required />
        <Field
          name="bidang"
          label="Bidang"
          type="select"
          required
          endpoint="getDataBidang"
          selectLabel="bidang"
          selectValue="bidang"
        />
        <Field
          required
          name="tingkatan"
          label="Tingkatan"
          type="select"
          listOptions={tingkatanProdiList}
        />
        <Row gutter={8}>
          <Col span={18}>
            <Field
              type="select"
              name="semester"
              label="Semester"
              listOptions={semesterList}
              required
            />
          </Col>
          <Col span={6}>
            <Field
              type="select"
              endpoint="getTahun"
              selectValue="tahun"
              selectLabel="tahun"
              name="tahun"
              label="Tahun"
              required
            />
          </Col>
        </Row>
      </FormSidos>
    </Fragment>
  );
};
export default ForbiddenMethodsForm;

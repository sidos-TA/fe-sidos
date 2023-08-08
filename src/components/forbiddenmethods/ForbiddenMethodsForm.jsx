import { Col, Form, Row } from "antd";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import semesterList from "../../constants/semesterList";
import tingkatanProdiList from "../../constants/tingkatanProdiList";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import isStringParseArray from "../../lib/src/helpers/isStringParseArray";

const ForbiddenMethodsForm = ({
  submitEndpoint,
  endpoint,
  deleteEndpoint,
  id,
}) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  return (
    <Fragment>
      <FormSidos
        form={form}
        submitEndpoint={submitEndpoint}
        payloadSubmit={{ id }}
        beforeSubmit={() => {
          return {
            ...form?.getFieldsValue(),
            bidang: JSON.stringify(form?.getFieldValue("bidang")),
          };
        }}
        afterMessageActionClose={() => {
          navigate("/forbidden_methods");
        }}
        customFetch={(formData) => {
          if (formData) {
            form?.setFieldsValue({
              ...formData,
              bidang: isStringParseArray(formData?.bidang)
                ? JSON.parse(formData?.bidang)
                : formData?.bidang,
            });
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

import { Col, Form, message, Row } from "antd";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import semesterList from "../../../constants/semesterList";
import Field from "../../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../../lib/src/components/FormSidos/form/FormSidos";
import catchHandler from "../../../lib/src/helpers/catchHandler";
import {
  responseError,
  responseSuccess,
} from "../../../lib/src/helpers/formatRespons";
import useFetch from "../../../lib/src/helpers/useFetch";
import TitleSection from "../../TitleSection";

const MahasiswaAddInputManual = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const fetch = useFetch();
  const [messageApi, contextHolder] = message.useMessage();

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
      {contextHolder}
      <TitleSection title="Input Manual" />
      <FormSidos
        form={form}
        submitEndpoint="addMhs"
        afterMessageActionClose={() => {
          navigate("/mahasiswa");
        }}
      >
        <Field type="text" name="no_bp" label="No. Bp" required />
        <Field type="text" name="name" label="Nama Mahasiswa" required />
        <Field
          type="select"
          name="prodi"
          label="Prodi"
          endpoint="getAllProdi"
          required
          selectLabel="prodiName"
          selectValue="prodiName"
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
export default MahasiswaAddInputManual;

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Form, Row, Typography } from "antd";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import jabatanList from "../../../constants/jabatanList";
import pendidikanList from "../../../constants/pendidikanList";
import Field from "../../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../../lib/src/components/FormSidos/form/FormSidos";
import TitleSection from "../../TitleSection";

const DosenAddInputManual = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  return (
    <Fragment>
      <TitleSection title="Input Manual" />
      <FormSidos
        form={form}
        submitEndpoint="addDataDosen"
        initialValues={{
          penelitian: [""],
        }}
        onSuccessAction={() => {
          navigate("/dosen");
        }}
      >
        <Field type="text" required name="name" label="Nama Dosen" />
        <Field type="text" required name="nip" label="Nip" />
        <Field
          type="select"
          required
          name="bidang"
          label="Bidang"
          mode="tags"
          endpoint="getDataBidang"
        />
        <Field type="number" required name="sks" label="SKS" />
        <Field
          type="select"
          required
          name="jabatan"
          label="Jabatan"
          listOptions={jabatanList}
        />
        <Field
          type="select"
          required
          name="pendidikan"
          label="Pendidikan Terakhir"
          listOptions={pendidikanList}
        />
        <Typography.Text>Penelitian</Typography.Text>
        <Form.List name="penelitian">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Row key={key} justify="space-around" align="middle">
                  <Col span={8}>
                    <Field
                      type="text"
                      formItemObj={{ wrapperCol: { span: 24 } }}
                      name={[name, "title"]}
                      label="Title"
                    />
                  </Col>
                  <Col span={8}>
                    <Field
                      type="text"
                      name={[name, "link_title"]}
                      label="Link"
                    />
                  </Col>
                  <Col span={"auto"}>
                    {name !== 0 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                    {name === 0 && <PlusOutlined onClick={() => add()} />}
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Form.List>
      </FormSidos>
    </Fragment>
  );
};

export default DosenAddInputManual;

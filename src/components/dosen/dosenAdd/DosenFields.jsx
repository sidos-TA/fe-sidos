import { Col, Form, Row, Typography } from "antd";
import InputSidos from "../../../lib/src/components/FormSidos/fields/InputSidos";
import NumberSidos from "../../../lib/src/components/FormSidos/fields/NumberSidos";
import SelectSidos from "../../../lib/src/components/FormSidos/fields/SelectSidos";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Fragment } from "react";

const DosenFields = () => {
  return (
    <Fragment>
      <InputSidos required name="name" label="Nama Dosen" />
      <SelectSidos required name="bidang" label="Bidang" mode="tags" />
      <NumberSidos required name="sks" label="SKS" />
      <SelectSidos required name="jabatan" label="Jabatan" />
      <SelectSidos required name="pendidikan" label="Pendidikan Terakhir" />
      <Typography.Text>Penelitian</Typography.Text>
      <Form.List name="penelitian">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Row key={key} justify="space-around" align="middle">
                <Col span={8}>
                  <InputSidos
                    formItemObj={{ wrapperCol: { span: 24 } }}
                    name={[name, "judulPenelitian"]}
                    label="Judul Penelitian"
                  />
                </Col>
                <Col span={8}>
                  <InputSidos name={[name, "link"]} label="Link" />
                </Col>
                <Col span={2}>
                  <InputSidos name={[name, "tahun"]} label="Tahun" />
                </Col>

                <Col span={2}>
                  <Row gutter={8}>
                    <Col span={12}>
                      <PlusOutlined
                        style={{ fontSize: 24 }}
                        onClick={() => add()}
                      />
                    </Col>
                    {name !== 0 && (
                      <Col span={12}>
                        <MinusCircleOutlined
                          style={{ fontSize: 24 }}
                          onClick={() => remove(name)}
                        />
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
            ))}
          </>
        )}
      </Form.List>
    </Fragment>
  );
};
export default DosenFields;

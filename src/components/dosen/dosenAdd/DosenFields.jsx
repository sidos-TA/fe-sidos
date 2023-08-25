import { Col, Form, Modal, Row, Typography } from "antd";
import InputSidos from "../../../lib/src/components/FormSidos/fields/InputSidos";
import NumberSidos from "../../../lib/src/components/FormSidos/fields/NumberSidos";
import SelectSidos from "../../../lib/src/components/FormSidos/fields/SelectSidos";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import TextAreaSidos from "../../../lib/src/components/FormSidos/fields/TextAreaSidos";
import { useDosenAddGetFromLinkContext } from "../../../context/Dosen/DosenAdd/DosenAddGetFromLinkContext";
import pendidikanList from "../../../constants/pendidikanList";
import jabatanList from "../../../constants/jabatanList";

const DosenFields = () => {
  const [modalApi, contextHolderModal] = Modal.useModal();
  const { FormScrape } = useDosenAddGetFromLinkContext();

  return (
    <Fragment>
      {contextHolderModal}
      <InputSidos required name="name" label="Nama Dosen" />
      <SelectSidos
        required
        name="bidang"
        label="Bidang"
        mode="tags"
        endpoint="getDataBidang"
        selectLabel="bidang"
        selectValue="bidang"
      />
      <NumberSidos required name="sks" label="SKS" />
      <SelectSidos
        required
        name="jabatan"
        label="Jabatan"
        listOptions={jabatanList}
      />
      <SelectSidos
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
                  <TextAreaSidos
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
                          onClick={() => {
                            modalApi.confirm({
                              maskClosable: true,
                              title: "Konfirmasi",
                              content: (
                                <Typography.Text>
                                  Apakah anda yakin untuk menghapus{" "}
                                  <Typography.Text strong>
                                    {
                                      FormScrape?.getFieldValue("penelitian")?.[
                                        name
                                      ]?.judulPenelitian
                                    }
                                  </Typography.Text>
                                </Typography.Text>
                              ),
                              onOk: () => {
                                remove(name);
                              },
                              okButtonProps: {
                                danger: true,
                              },
                              okText: "Hapus",
                            });
                          }}
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

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Form, Modal, Row } from "antd";
import { useDosenDetailProfileContext } from "../../../../context/Dosen/DosenDetail/DosenDetailProfileContext";
import CheckboxSidos from "../../../../lib/src/components/FormSidos/fields/CheckboxSidos";
import Field from "../../../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../../../lib/src/components/FormSidos/form/FormSidos";

const DosenDetailProfileModalBidang = () => {
  const { toggleModalDosenDetailProfile, state, setState, stateTabs } =
    useDosenDetailProfileContext();

  const [FormBidang] = Form.useForm();

  return (
    <Modal
      title="Bidang"
      open={state.isVisibleModalBidang}
      onCancel={() =>
        toggleModalDosenDetailProfile({
          visible: false,
          state: "isVisibleModalBidang",
        })
      }
      onOk={() => {
        setState((prev) => ({
          ...prev,
          profileIdentity: {
            ...state.profileIdentity,
            bidangs: FormBidang?.getFieldValue("bidangs")?.map((data) => ({
              bidang: data?.bidang,
            })),
          },
        }));
        toggleModalDosenDetailProfile({
          visible: false,
          state: "isVisibleModalBidang",
        });
      }}
      okText="Update Bidang"
    >
      <FormSidos
        form={FormBidang}
        initialValues={{
          bidangs:
            state?.profileIdentity?.bidangs ||
            (stateTabs?.datas?.bidangs?.length
              ? stateTabs?.datas?.bidangs
              : [""]),
        }}
      >
        <Form.List name="bidangs">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Row key={key} justify="space-around" align="middle">
                  <Col span={8}>
                    <Field
                      type={
                        FormBidang?.getFieldValue("bidang")?.[name]
                          ?.chkToText?.[0] === "New Data"
                          ? "text"
                          : "select"
                      }
                      formItemObj={{ wrapperCol: { span: 24 } }}
                      name={[name, "bidang"]}
                      label="Nama Bidang"
                      endpoint="getDataBidang"
                      selectLabel="bidang"
                      selectValue="bidang"
                    />
                  </Col>

                  <Col>
                    <CheckboxSidos
                      listOptions={["New Data"]}
                      name={[name, "chkToText"]}
                      onChange={(val) => {
                        const newValueBidang = FormBidang?.getFieldValue(
                          "bidangs"
                        )?.map((bidang, idx) => {
                          if (idx === name) {
                            return {
                              ...bidang,
                              chkToText: val,
                            };
                          }
                          return bidang;
                        });
                        FormBidang?.setFieldsValue({
                          bidang: newValueBidang,
                        });
                      }}
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
    </Modal>
  );
};

export default DosenDetailProfileModalBidang;

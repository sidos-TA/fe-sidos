import { Col, Form, Modal, Row } from "antd";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import BtnSidos from "../../lib/src/components/BtnSidos";
import SmallTextSidos from "../../lib/src/components/SmallTextSidos";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SettingKaprodiAddTahun = ({ tahunState, setTahunState }) => {
  const [FormTahunAkademik] = Form.useForm();

  const navigate = useNavigate();

  const loopAddTahun = ({ dataTahun }) => {
    const arrTahun = [];
    for (
      let initTahun = Number(dataTahun);
      initTahun < Number(dataTahun) + 5;
      initTahun++
    ) {
      arrTahun?.push(initTahun);
    }

    return arrTahun;
  };

  const newArrDatasTahun = [];

  const generateTahunHandler = () => {
    const arrDataTahun = FormTahunAkademik?.getFieldValue("tahun")?.map(
      (data) => data?.tahun
    );
    const lastDataTahun = arrDataTahun?.[arrDataTahun?.length - 1];

    const [tahun1, tahun2] = lastDataTahun.split("/");

    const arrTahun1 = loopAddTahun({
      dataTahun: tahun1,
    });
    const arrTahun2 = loopAddTahun({
      dataTahun: tahun2,
    });

    arrTahun1?.forEach((th1, idx) => {
      newArrDatasTahun?.push(`${th1}/${arrTahun2[idx]}`);
    });

    setTahunState((prev) => ({
      ...prev,
      arrData: [
        ...new Set([
          ...tahunState.arrData.map((data) => data.tahun),
          ...newArrDatasTahun,
        ]),
      ]?.map((th) => ({
        tahun: th,
      })),
    }));
    FormTahunAkademik?.setFieldsValue({
      tahun: [
        ...new Set([
          ...tahunState.arrData.map((data) => data.tahun),
          ...newArrDatasTahun,
        ]),
      ]?.map((th) => ({
        tahun: th,
      })),
    });
  };

  useEffect(() => {
    if (tahunState?.isOpenModal && tahunState.arrData?.length) {
      FormTahunAkademik?.setFieldsValue({
        tahun: [
          ...new Set([
            ...tahunState.arrData.map((data) => data.tahun),
            ...newArrDatasTahun,
          ]),
        ]?.map((th) => ({
          tahun: th,
        })),
      });
    }
  }, [tahunState?.isOpenModal]);

  return (
    <Modal
      title="Update Kaprodi"
      onCancel={() =>
        setTahunState((prev) => ({ ...prev, isOpenModal: false }))
      }
      open={tahunState?.isOpenModal}
      visi
      footer={false}
    >
      <FormSidos
        form={FormTahunAkademik}
        submitEndpoint="updateSettingTahun"
        submitText="Update Tahun Akademik"
        afterMessageActionClose={() => {
          setTahunState((prev) => ({ ...prev, isOpenModal: false }));
          navigate("/");
        }}
        beforeSubmit={() => {
          return {
            arrDatas: FormTahunAkademik?.getFieldValue("tahun"),
          };
        }}
        initialValues={{
          //   tahun: tahunState?.arrData || [""],
          tahun: FormTahunAkademik?.getFieldValue("tahun")?.length
            ? tahunState?.arrData
            : [""],
        }}
      >
        <Form.List name="tahun">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Row key={key} justify="space-around" align="middle">
                  <Col span={12}>
                    <Field
                      type="text"
                      name={[name, "tahun"]}
                      {...(name === 0 && {
                        label: "Tahun",
                      })}
                    />
                    {name === 0 && (
                      <SmallTextSidos>Contoh : 2021/2022</SmallTextSidos>
                    )}
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
        <BtnSidos
          position="center"
          type="dashed"
          onClick={() => generateTahunHandler()}
        >
          Generate Data Tahun
        </BtnSidos>
      </FormSidos>
    </Modal>
  );
};
export default SettingKaprodiAddTahun;

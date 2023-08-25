import { Col, Form, message, Row } from "antd";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingKaprodiAddTahun from "../../components/setting/SettingKaprodiAddTahun";
import SettingKaprodiModal from "../../components/setting/SettingKaprodiModal";
import TitlePage from "../../components/TitlePage";
import semesterList from "../../constants/semesterList";
import BtnSidos from "../../lib/src/components/BtnSidos";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import LabelSidos from "../../lib/src/components/FormSidos/fields/LabelSidos";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import catchHandler from "../../lib/src/helpers/catchHandler";
import { responseSuccess } from "../../lib/src/helpers/formatRespons";
import useFetch from "../../lib/src/helpers/useFetch";

const Settings = () => {
  const [FormSettings] = Form.useForm();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [tahunState, setTahunState] = useState({
    arrData: [""],
    isOpenModal: false,
    isLoading: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const fetch = useFetch();

  const openHandler = (openVal) => setOpen(openVal);

  const fetchDataTahun = () => {
    setTahunState((prev) => ({ ...prev, isLoading: true }));
    fetch({
      endpoint: "getTahun",
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res?.status === 200) {
          setTahunState((prev) => ({
            ...prev,
            arrData: res?.data,
            isOpenModal: true,
          }));
        }
      })
      ?.catch((e) => {
        catchHandler({
          e,
          messageApi,
          navigate,
        });
      })
      ?.finally(() => {
        setTahunState((prev) => ({ ...prev, isLoading: false }));
      });
  };

  return (
    <Fragment>
      {contextHolder}
      <TitlePage title="Settings" />
      <FormSidos
        form={FormSettings}
        endpoint="getSetting"
        submitEndpoint="updateSettings"
        afterMessageActionClose={() => {
          navigate("/");
        }}
        submitText="Update Settings"
      >
        <Row gutter={16}>
          <Col span={9}>
            <Field
              required
              type="select"
              name="semester"
              label="Semester"
              listOptions={semesterList}
            />
          </Col>
          <Col span={9}>
            <Field
              required
              type="select"
              name="tahun"
              label="Tahun"
              endpoint="getTahun"
              selectLabel="tahun"
              selectValue="tahun"
            />
          </Col>
          <Col span={6}>
            <BtnSidos
              loading={tahunState?.isLoading}
              disabled={tahunState?.isLoading}
              onClick={() => {
                fetchDataTahun();
              }}
            >
              Tambah Tahun Akademik
            </BtnSidos>
          </Col>
        </Row>
        <Field
          required
          type="number"
          name="kuota_bimbingan"
          label="Kuota Bimbingan"
        />
        <Field required type="number" name="kGram" label="Jumlah KGram" />
        <Field
          required
          type="number"
          name="maksimal_usulan"
          label="Maksimal Usulan"
          // rules={[
          //   {
          //     validator: (_, value) => {
          //       if (value <= 2) {
          //         return Promise.reject(
          //           new Error(
          //             "Mohon berikan lebih dari 2 untuk alternatif para mahasiswa"
          //           )
          //         );
          //       } else {
          //         return Promise.resolve();
          //       }
          //     },
          //   },
          // ]}
        />
        <LabelSidos label="Update data Kaprodi">
          <BtnSidos onClick={() => openHandler(true)}>Update Kaprodi</BtnSidos>
        </LabelSidos>

        <SettingKaprodiAddTahun
          tahunState={tahunState}
          setTahunState={setTahunState}
        />
        <SettingKaprodiModal openState={open} openHandler={openHandler} />
      </FormSidos>
    </Fragment>
  );
};
export default Settings;

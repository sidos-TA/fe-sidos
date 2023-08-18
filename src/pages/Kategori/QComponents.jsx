import { Col, Grid, Row, Typography } from "antd";
import { lazy, Suspense } from "react";
// import InputNumberAHP from "../../components/kategori/InputNumberAHP";
import { benefitCost } from "../../constants/benefitCost";
import { useAHPContext } from "../../context/AHPContext";
import Field from "../../lib/src/components/FormSidos/fields/Field";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import RadioSidos from "../../lib/src/components/FormSidos/fields/RadioSidos";
import LoadingSidos from "../../lib/src/components/LoadingSidos";

const InputNumberAHP = lazy(() =>
  import("../../components/kategori/InputNumberAHP")
);
const QComponents = ({ item, idxItem }) => {
  const { xs } = Grid.useBreakpoint();
  const { Text } = Typography;

  const { form } = useAHPContext();

  return (
    <Row
      align="middle"
      justify={xs ? "center" : "space-between"}
      gutter={32}
      {...(xs && { gutter: [16, 16] })}
    >
      <Col span={xs ? 24 : 7}>
        <Field
          name={`kriteria${idxItem}`}
          label={`Nama Kriteria (K${idxItem})`}
          required
          type="text"
          onChange={(val) => {
            form.setFieldValue(`kriteria${idxItem}`, val);
          }}
        />
      </Col>
      <Col span={12}>
        <Text type="secondary">Skala prioritas</Text>
        <Suspense fallback={<LoadingSidos style={{ height: "30vh" }} />}>
          <InputNumberAHP
            item={item}
            idxItem={idxItem}
            valueForm={form.getFieldsValue(true)}
          />
        </Suspense>
      </Col>
      <Col span={5}>
        <RadioSidos
          required
          label={`Benefit/Cost Kriteria (K${idxItem})`}
          listOptions={benefitCost}
          name={`benefitCost${idxItem}`}
        />
      </Col>
    </Row>
  );
};

export default QComponents;

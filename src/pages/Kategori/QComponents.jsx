import { Col, Grid, Row, Typography } from "antd";
import { lazy, Suspense } from "react";
// import InputNumberAHP from "../../components/kategori/InputNumberAHP";
import { benefitCost } from "../../constants/benefitCost";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import RadioSidos from "../../lib/src/components/FormSidos/fields/RadioSidos";
import LoadingSidos from "../../lib/src/components/LoadingSidos";

const InputNumberAHP = lazy(() =>
  import("../../components/kategori/InputNumberAHP")
);
const QComponents = ({ item, idxItem }) => {
  const { xs } = Grid.useBreakpoint();
  const { Text } = Typography;

  return (
    <Row
      align="middle"
      justify={xs ? "center" : "space-between"}
      gutter={32}
      {...(xs && { gutter: [16, 16] })}
    >
      <Col span={xs ? 24 : 7}>
        <InputSidos
          required
          name={`kriteria${idxItem}`}
          label={`Nama Kriteria (K${idxItem})`}
        />
      </Col>
      <Col span={12}>
        <Text type="secondary">Skala prioritas</Text>
        <Suspense fallback={<LoadingSidos style={{ height: "30vh" }} />}>
          <InputNumberAHP item={item} idxItem={idxItem} />
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

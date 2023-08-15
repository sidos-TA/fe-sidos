import { Modal, Table } from "antd";
import { Suspense } from "react";
import { useUsulanFormContext } from "../../context/Usulan/UsulanFormContext";
import LoadingSidos from "../../lib/src/components/LoadingSidos";
import TableSidos from "../../lib/src/components/TableSidos";

const { Column } = Table;
const UsulanFormModalSimilaritasJudul = () => {
  const { state, openModalSimilaritasJudul, form } = useUsulanFormContext();

  return (
    <Suspense fallback={<LoadingSidos />}>
      <Modal
        width={1000}
        title="Cek Similaritas Judul"
        open={state?.modalSimilaritas?.visibleModal}
        onCancel={() => {
          openModalSimilaritasJudul(false);
        }}
        onOk={() => {
          openModalSimilaritasJudul(false);
        }}
      >
        <TableSidos pagination={false} arrDatas={state?.arrSimilarJudul}>
          <Column
            title="Judul yang diusulkan"
            onCell={(_, index) => {
              if (index === 0) {
                return {
                  rowSpan: state?.arrSimilarJudul?.length,
                };
              } else {
                return {
                  rowSpan: 0,
                };
              }
            }}
            render={() => form?.getFieldValue("judul")}
          />
          <Column title="Judul sebelumnya" dataIndex="judul" />
          <Column title="Bidang" dataIndex="bidang" />
          <Column
            title="Skor Similaritas"
            dataIndex="skor"
            render={(skor) => `${skor * 100}%`}
          />
        </TableSidos>
      </Modal>
    </Suspense>
  );
};

export default UsulanFormModalSimilaritasJudul;

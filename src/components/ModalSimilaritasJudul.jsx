import { Modal, Table } from "antd";
import TableSidos from "../lib/src/components/TableSidos";

const { Column } = Table;
const ModalSimilaritasJudul = ({ judul, open, closeModal, arrDatas }) => {
  return (
    <Modal
      width={1000}
      title="Cek Similaritas Judul"
      open={open}
      onCancel={() => {
        closeModal();
      }}
      onOk={() => {
        closeModal(false);
      }}
      destroyOnClose
    >
      <TableSidos pagination={false} arrDatas={arrDatas}>
        <Column
          title="Judul yang diusulkan"
          onCell={(_, index) => {
            if (index === 0) {
              return {
                rowSpan: arrDatas?.length,
              };
            } else {
              return {
                rowSpan: 0,
              };
            }
          }}
          render={() => judul}
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
  );
};
export default ModalSimilaritasJudul;

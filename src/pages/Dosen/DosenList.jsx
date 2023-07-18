import { Table } from "antd";
import { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";

const { Column } = Table;
const DosenList = () => {
  return (
    <Fragment>
      <TitlePage title="Data Dosen" />
      <TableSidos endpoint="getAllDosen">
        <Column title="Nama Dosen" dataIndex="name" width={200} fixed />
        <Column title="Nip" dataIndex="nip" />
        <Column title="Mahasiswa Mengusulkan" dataIndex="n_mhs_usulan" />
        <Column title="Mahasiswa Bimbingan" dataIndex="n_mhs_bimbingan" />
        <Column title="SKS" dataIndex="sks" />
        <Column title="Jabatan" dataIndex="jabatan" />
        <Column title="Pendidikan" dataIndex="pendidikan" />
      </TableSidos>
    </Fragment>
  );
};

export default DosenList;

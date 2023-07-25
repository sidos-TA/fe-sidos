import { Table } from "antd";
import { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";

const { Column } = Table;
const ProdiList = () => {
  return (
    <Fragment>
      <TitlePage title="Data Prodi" addRoute="prodi_Add" />
      <TableSidos endpoint="getAllProdi" tableLayout="fixed">
        <Column title="Prodi" dataIndex="prodiName" />
        <Column title="Tingkatan" dataIndex="tingkatan" />
      </TableSidos>
    </Fragment>
  );
};
export default ProdiList;

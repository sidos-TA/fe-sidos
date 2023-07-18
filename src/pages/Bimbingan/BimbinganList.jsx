import { Table } from "antd";
import { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";

const { Column } = Table;
const BimbinganList = () => {
  return (
    <Fragment>
      <TitlePage title="Data Bimbingan" addRoute="bimbingan_Add" />
      <TableSidos endpoint="getBimbingan" tableLayout="fixed">
        <Column title="Judul" dataIndex="judul" />
      </TableSidos>
    </Fragment>
  );
};
export default BimbinganList;

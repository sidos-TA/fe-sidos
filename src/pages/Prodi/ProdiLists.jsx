import { Table } from "antd";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";

const { Column } = Table;
const ProdiLists = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <TitlePage title="Data Prodi" addRoute="prodi_Add/input_manual" />
      <TableSidos
        endpoint="getAllProdi"
        tableLayout="fixed"
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`prodi_Edit/${record?.id}`);
            },
          };
        }}
      >
        <Column title="Prodi" dataIndex="prodiName" />
        <Column title="Tingkatan" dataIndex="tingkatan" />
      </TableSidos>
    </Fragment>
  );
};
export default ProdiLists;

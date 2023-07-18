import { Table } from "antd";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import TableSidos from "../../lib/src/components/TableSidos";

const { Column } = Table;
const UsulanList = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <TitlePage title="Data Usulan" addRoute="usulan_Add" />
      <TableSidos
        tableLayout="fixed"
        endpoint="getUsulan"
        customFilter={[
          <SelectSidos
            key="bidang"
            label="bidang"
            endpoint={"getDataBidang"}
            formItemObj={{ labelCol: { span: 24 } }}
          />,
        ]}
      >
        <Column
          onCell={(record) => {
            return {
              onClick: () => {
                navigate(`usulan_edit/${record?.no_bp}`);
              },
            };
          }}
          title="Nama Mahasiswa"
          render={(record) => {
            return <p>{record?.mh?.name}</p>;
          }}
        />
        <Column
          onCell={(record) => {
            return {
              onClick: () => {
                navigate(`usulan_edit/${record?.no_bp}`);
              },
            };
          }}
          title="Judul"
          dataIndex="judul"
        />
        <Column
          title="Bidang"
          dataIndex="bidang"
          onCell={(record) => {
            return {
              onClick: () => {
                navigate(`usulan_edit/${record?.no_bp}`);
              },
            };
          }}
        />
        <Column
          title="Status Usulan"
          dataIndex="status_usulan"
          onCell={(record) => {
            return {
              onClick: () => {
                navigate(`usulan_edit/${record?.no_bp}`);
              },
            };
          }}
        />
      </TableSidos>
    </Fragment>
  );
};

export default UsulanList;

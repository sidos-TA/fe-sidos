import { Table } from "antd";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import TableSidos from "../../lib/src/components/TableSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const { Column } = Table;
const UsulanList = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState();
  let timeout;
  const dataCookie = decodeCookie("token");

  const searchFilter = ({ key, value }) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setPayload({
        ...payload,
        [key]: value,
      });
    }, 300);
  };

  return (
    <Fragment>
      <TitlePage title="Data Usulan" addRoute="usulan_Add" />
      <TableSidos
        payload={{
          ...payload,
          ...(dataCookie?.roles === 2 && {
            no_bp: dataCookie?.no_bp,
          }),
        }}
        tableLayout="fixed"
        endpoint="getUsulan"
        customFilter={[
          <SelectSidos
            key="bidang"
            label="bidang"
            allowClear
            endpoint={"getDataBidang"}
            onChange={(value) => {
              searchFilter({
                key: "bidang",
                value,
              });
            }}
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

import { Table } from "antd";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import FilterSemester from "../../components/FilterSemester";
import TitlePage from "../../components/TitlePage";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const { Column } = Table;
const KeputusanLists = () => {
  const [payload, setPayload] = useState({});
  const dataCookie = decodeCookie("token");
  const navigate = useNavigate();
  let timeout;

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
      <TitlePage title="Data Keputusan" />
      {dataCookie?.roles === 1 && (
        <FilterSemester payloadState={payload} setStatePayload={setPayload} />
      )}
      <TableSidos
        tableLayout="fixed"
        endpoint="getKeputusan"
        customFilter={[
          <SelectSidos
            key="prodi"
            allowClear
            label="Prodi"
            endpoint="getAllProdi"
            selectLabel="prodiName"
            selectValue="prodiName"
            onChange={(value) => {
              searchFilter({
                key: "prodi",
                value,
              });
            }}
          />,
        ]}
        payload={{
          status_usulan: "confirmed",
          ...(dataCookie?.roles === 1 && {
            status_judul: "usulan",
          }),
          ...(dataCookie?.roles === 2 && {
            no_bp: dataCookie?.no_bp,
          }),
          ...payload,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`keputusan_Edit/${record?.id_usulan}`);
            },
          };
        }}
      >
        <Column
          title="Nama Mahasiswa"
          render={(record) => {
            return record?.mh?.name;
          }}
        />
        <Column
          title="No. Bp"
          render={(record) => {
            return record?.mh?.no_bp;
          }}
        />
        <Column
          title="Prodi"
          render={(record) => {
            return record?.mh?.prodi;
          }}
        />
        <Column title="Judul" dataIndex="judul" />
        <Column title="Status Judul" dataIndex="status_judul" />
      </TableSidos>
    </Fragment>
  );
};
export default KeputusanLists;

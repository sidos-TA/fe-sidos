import { Table } from "antd";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import FilterSemester from "../../components/FilterSemester";
import TitlePage from "../../components/TitlePage";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const { Column } = Table;
const KeputusanLists = () => {
  const [payload, setPayload] = useState({});
  const dataCookie = decodeCookie("token");
  const navigate = useNavigate();

  return (
    <Fragment>
      <TitlePage title="Data Keputusan" />
      {dataCookie?.roles === 1 && (
        <FilterSemester payloadState={payload} setStatePayload={setPayload} />
      )}
      <TableSidos
        tableLayout="fixed"
        endpoint="getKeputusan"
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
              if (dataCookie?.roles === 1) {
                navigate(`keputusan_Edit/${record?.usulans?.[0]?.id_usulan}`);
              } else {
                navigate("/");
              }
            },
          };
        }}
      >
        <Column title="Nama Mahasiswa" dataIndex="name" />
        <Column title="Prodi" dataIndex="prodi" />
        <Column
          title="Judul"
          render={(record) => record?.usulans?.[0]?.judul}
        />
        <Column
          title="Status Judul"
          render={(record) => record?.usulans?.[0]?.status_judul}
        />
      </TableSidos>
    </Fragment>
  );
};
export default KeputusanLists;

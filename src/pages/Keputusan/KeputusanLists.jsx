import { Table } from "antd";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";

const { Column } = Table;
const KeputusanLists = () => {
  const [state, setState] = useState({
    arrDatasKeputusans: [],
    statusJudul: "",
  });

  const navigate = useNavigate();
  return (
    <Fragment>
      <TitlePage title="Data Keputusan" />
      <TableSidos
        endpoint="getUsulan"
        payload={{
          status_usulan: "confirmed",
          status_judul: "usulan",
        }}
        customFetch={(formData) => {
          setState((prev) => ({
            ...prev,
            arrDatasKeputusans: formData?.data?.arrDatas,
            statusJudul: formData?.data?.status_judul,
          }));
        }}
        arrDatas={state?.arrDatasKeputusans}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`keputusan_Edit/${record?.no_bp}`);
            },
          };
        }}
      >
        <Column title="Nama Mahasiswa" render={(record) => record?.mh?.name} />
        <Column title="Prodi" render={(record) => record?.mh?.prodi} />
        <Column title="Judul" dataIndex="judul" />
        <Column
          title="Status Judul"
          render={(record) => record?.mh?.status_judul}
        />
      </TableSidos>
    </Fragment>
  );
};
export default KeputusanLists;

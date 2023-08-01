import { Table } from "antd";
import { useState } from "react";
import { Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import statusJudul from "../../constants/statusJudul";
import RadioSidos from "../../lib/src/components/FormSidos/fields/RadioSidos";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";

const { Column } = Table;
const BimbinganLists = () => {
  const [payload, setPayload] = useState();
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
      <TitlePage title="Data Bimbingan" />
      <TableSidos
        endpoint="getBimbingan"
        payload={payload}
        customFilter={[
          <SelectSidos
            key="bidang"
            label="bidang"
            allowClear
            endpoint="getDataBidang"
            formItemObj={{ labelCol: { span: 24 } }}
            onChange={(value) => {
              searchFilter({
                key: "bidang",
                value,
              });
            }}
          />,
          <RadioSidos
            key="status_judul"
            onChange={(value) => {
              searchFilter({
                key: "status_judul",
                value,
              });
            }}
            label="Status Judul"
            listOptions={statusJudul}
          />,
        ]}
        expandable={{
          columnTitle: "Dosen Pembimbing",
          columntWidth: 20,
          expandedRowRender: (record) => {
            return (
              <TableSidos
                arrDatas={record?.dosen}
                pagination={false}
                tableLayout="fixed"
              >
                <Column title="Nama Dosen" dataIndex="name" />
              </TableSidos>
            );
          },
          rowExpandable: (record) => record.dosen?.length,
        }}
      >
        <Column title="Nama Mahasiswa" dataIndex="name" />
        <Column title="Judul" dataIndex="judul" />
        <Column title="Bidang" dataIndex="bidang" />
        <Column title="Prodi" render={(record) => record?.mh?.prodi} />
        <Column
          title="Status Judul"
          render={(record) => {
            return record?.mh?.status_judul;
          }}
        />
      </TableSidos>
    </Fragment>
  );
};
export default BimbinganLists;

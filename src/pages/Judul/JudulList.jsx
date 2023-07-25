import { Table } from "antd";
import { Fragment } from "react";
import { useState } from "react";
import TitlePage from "../../components/TitlePage";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";

const { Column } = Table;
const JudulList = () => {
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
      <TitlePage title="Data Judul" />
      <TableSidos
        payload={{
          ...payload,
          // , status_judul: "terima"
        }}
        tableLayout="fixed"
        endpoint="getJudul"
        customFilter={[
          <InputSidos
            key="judul"
            label="Judul"
            allowClear
            onChange={(value) => {
              searchFilter({ key: "judul", value });
            }}
          />,
          <SelectSidos
            key="bidang"
            label="Bidang"
            allowClear
            endpoint="getDataBidang"
            onChange={(value) => {
              searchFilter({ key: "bidang", value });
            }}
          />,
        ]}
      >
        <Column title="Judul" render={(record) => record?.judul} />
        <Column title="Bidang" render={(record) => record?.bidang} />
        <Column title="Tingkatan" render={(record) => record?.tingkatan} />
      </TableSidos>
    </Fragment>
  );
};
export default JudulList;

import { Table } from "antd";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import jabatanList from "../../constants/jabatanList";
import pendidikanList from "../../constants/pendidikanList";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";

const { Column } = Table;
const DosenList = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});
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
      <TitlePage title="Data Dosen" addRoute="dosen_Add/input_manual" />
      <TableSidos
        endpoint="getAllDosen"
        payload={payload}
        onRow={(record) => {
          return {
            onClick: () => navigate(`dosen_Info/${record?.nip}/profiledosen`),
          };
        }}
        customFilter={[
          <InputSidos
            key="name_dosen"
            label="Nama Dosen"
            formItemObj={{ labelCol: { span: 24 } }}
            onChange={(value) => {
              searchFilter({ key: "name", value });
            }}
          />,
          <SelectSidos
            key="jabatan"
            allowClear
            label="Jabatan"
            formItemObj={{ labelCol: { span: 24 } }}
            onChange={(value) => {
              searchFilter({ key: "jabatan", value });
            }}
            listOptions={jabatanList}
          />,
          <SelectSidos
            key="pendidikan"
            allowClear
            label="Pendidikan"
            formItemObj={{ labelCol: { span: 24 } }}
            onChange={(value) => {
              searchFilter({ key: "pendidikan", value });
            }}
            listOptions={pendidikanList}
          />,
        ]}
      >
        <Column title="Nama Dosen" dataIndex="name" width={200} fixed />
        <Column title="Nip" dataIndex="nip" />
        <Column
          title="Mahasiswa Mengusulkan"
          render={(record) => {
            return record?.usulans?.length;
          }}
        />
        <Column
          title="Mahasiswa Bimbingan"
          render={(record) => {
            return record?.bimbingans?.length;
          }}
        />
        <Column title="SKS" dataIndex="sks" />
        <Column title="Jabatan" dataIndex="jabatan" />
        <Column title="Pendidikan" dataIndex="pendidikan" />
      </TableSidos>
    </Fragment>
  );
};

export default DosenList;

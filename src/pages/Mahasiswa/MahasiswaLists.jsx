import { Alert, Table } from "antd";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import TableSidos from "../../lib/src/components/TableSidos";
import TagSidos from "../../lib/src/components/TagSidos";
import colorTagHandler from "../../lib/src/helpers/colorTagHandler";

const { Column } = Table;
const MahasiswaLists = () => {
  const navigate = useNavigate();
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
      <TitlePage title="Data Mahasiswa" addRoute="mahasiswa_Add/input_manual" />
      <TableSidos
        useFilterSemester
        payload={payload}
        usePaginateBE
        excelOptions={{
          endpoint: "download_mhs",
          fileName: "Data Mahasiswa",
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`mahasiswa_Info/${record?.no_bp}/profilemhs`);
            },
          };
        }}
        customFilter={[
          <InputSidos
            label="Nama Mahasiswa"
            formItemObj={{ labelCol: { span: 24 } }}
            key="namamhs"
            placeholder="Nama Mahasiswa"
            onChange={(value) => {
              searchFilter({
                key: "name",
                value,
              });
            }}
          />,

          <SelectSidos
            allowClear
            endpoint="getAllProdi"
            label="Prodi"
            formItemObj={{ labelCol: { span: 24 } }}
            key="prodi"
            onClear={() => {
              searchFilter({
                key: "prodi",
                value: "",
              });
            }}
            onSelect={(value) => {
              searchFilter({
                key: "prodi",
                value,
              });
            }}
            selectLabel="prodiName"
            selectValue="prodiName"
          />,
        ]}
        endpoint="getAllMhs"
      >
        <Column title="Nama" dataIndex="name" width={400} />
        <Column title="No. Bp" dataIndex="no_bp" />
        <Column title="Prodi" dataIndex="prodi" />
        <Column
          title="Judul TA"
          width={500}
          render={(record) => {
            if (record?.usulans?.[0]?.judul) {
              return record?.usulans?.[0]?.judul;
            } else {
              return (
                <Alert
                  style={{ textAlign: "center" }}
                  type="warning"
                  message="Belum ada judul yang diajukan"
                />
              );
            }
          }}
        />
        <Column
          width={100}
          title="Status"
          render={(record) => {
            const judul = record?.usulans?.[0]?.status_judul;
            const color = colorTagHandler(judul || "belum mengajukan");
            return (
              <TagSidos fontSize={14} padding={"4px 10px"} color={color}>
                {judul || "belum mengajukan"}
              </TagSidos>
            );
          }}
        />
        <Column title="Semester" dataIndex="semester" />
        <Column title="Tahun" dataIndex="tahun" />
      </TableSidos>
    </Fragment>
  );
};
export default MahasiswaLists;

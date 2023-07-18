import { Table, Tag } from "antd";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import TableSidos from "../../lib/src/components/TableSidos";
import TagSidos from "../../lib/src/components/TagSidos";
import colorTagHandler from "../../lib/src/helpers/colorTagHandler";

const { Column } = Table;
const MahasiswaList = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <TitlePage title="Data Mahasiswa" />
      <TableSidos
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/mahasiswa/mahasiswa_info/${record?.no_bp}/profilemhs`);
            },
          };
        }}
        customFilter={[
          <InputSidos
            label="Nama Mahasiswa"
            formItemObj={{ labelCol: { span: 24 } }}
            key="1"
            placeholder="Nama Mahasiswa"
          />,
          <SelectSidos
            label="Prodi"
            formItemObj={{ labelCol: { span: 24 } }}
            key="prodi"
          />,
          <InputSidos
            label="Judul TA"
            formItemObj={{ labelCol: { span: 24 } }}
            key="2"
            placeholder="Judul TA"
          />,
          <SelectSidos
            label="Status Judul"
            formItemObj={{ labelCol: { span: 24 } }}
            key="status_judul"
            listOptions={[
              {
                label: "terima",
                value: "terima",
              },
              {
                label: "tolak",
                value: "tolak",
              },
              {
                label: "usulan",
                value: "usulan",
              },
              {
                label: "belum mengajukan",
                value: "belum mengajukan",
              },
            ]}
          />,
        ]}
        endpoint="getAllMhs"
      >
        <Column title="Nama" dataIndex="name" width={400} />
        <Column title="No. Bp" dataIndex="no_bp" />
        <Column title="Prodi" dataIndex="prodi" />
        <Column title="Judul TA" dataIndex="judul_acc" width={500} />
        <Column
          width={100}
          title="Status"
          dataIndex="status_judul"
          render={(record) => {
            const color = colorTagHandler(record);
            return (
              <TagSidos fontSize={14} padding={"4px 10px"} color={color}>
                {record}
              </TagSidos>
            );
          }}
        />
      </TableSidos>
    </Fragment>
  );
};
export default MahasiswaList;

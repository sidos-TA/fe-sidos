import { Table } from "antd";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import FilterSemester from "../../components/FilterSemester";
import TitlePage from "../../components/TitlePage";
import statusJudul from "../../constants/statusJudul";
import RadioSidos from "../../lib/src/components/FormSidos/fields/RadioSidos";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";
import TagSidos from "../../lib/src/components/TagSidos";
import colorTagHandler from "../../lib/src/helpers/colorTagHandler";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const { Column } = Table;
const BimbinganLists = () => {
  const [payload, setPayload] = useState({});
  let timeout;
  const dataCookie = decodeCookie("token");
  const navigate = useNavigate();

  const searchFilter = ({ key, value }) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setPayload({
        ...payload,
        [key]: value,
      });
    }, 300);
  };

  const goToDetailHandler = (id_usulan) => {
    if (dataCookie?.roles === 1) {
      navigate(`bimbingan_Detail/${id_usulan}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Fragment>
      <TitlePage title="Data Bimbingan" />
      <FilterSemester payloadState={payload} setStatePayload={setPayload} />
      <TableSidos
        endpoint="getBimbingan"
        payload={payload}
        excelOptions={{
          endpoint: "download_bimbingan",
          fileName: "Data Bimbingan",
        }}
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
        onRow={(record) => {
          return {
            onClick: () => {
              goToDetailHandler(record?.usulans?.[0]?.id_usulan);
            },
          };
        }}
      >
        <Column title="Nama Mahasiswa" render={(record) => record?.name} />
        <Column title="Judul" dataIndex="judul" />
        <Column title="Bidang" dataIndex="bidang" />
        <Column title="Prodi" dataIndex="bidang" />
        <Column
          title="Status Judul"
          dataIndex="status_judul"
          render={(status_judul) => {
            const judul = status_judul;
            const color = colorTagHandler(judul || "belum mengajukan");
            return (
              <TagSidos fontSize={14} padding={"4px 10px"} color={color}>
                {judul || "belum mengajukan"}
              </TagSidos>
            );
          }}
        />
        <Column title="Keterangan" dataIndex="keterangan" />
        <Column title="Dosen Pembimbing 1" dataIndex="dosen_pembimbing1" />
        <Column title="Dosen Pembimbing 2" dataIndex="dosen_pembimbing2" />
      </TableSidos>
    </Fragment>
  );
};
export default BimbinganLists;

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
          columntWidth: 10,
          expandedRowRender: (recordRow) => {
            return (
              <TableSidos
                arrDatas={recordRow?.usulans}
                pagination={false}
                tableLayout="fixed"
                onRow={() => {
                  return {
                    onClick: () => {
                      goToDetailHandler(recordRow?.id_usulan);
                    },
                  };
                }}
              >
                <Column
                  title="Nama Dosen"
                  render={(record) => record?.dosen?.name}
                />
                <Column title="Nip" render={(record) => record?.dosen?.nip} />
              </TableSidos>
            );
          },
          rowExpandable: (record) => record.usulans?.length,
        }}
      >
        <Column
          title="Nama Mahasiswa"
          // dataIndex="name"
          render={(record) => record?.name}
          onCell={(record) => {
            return {
              onClick: () => {
                goToDetailHandler(record?.usulans?.[0]?.id_usulan);
              },
            };
          }}
        />
        <Column
          title="Judul"
          render={(record) => record?.usulans?.[0]?.judul}
          onCell={(record) => {
            return {
              onClick: () => {
                goToDetailHandler(record?.usulans?.[0]?.id_usulan);
              },
            };
          }}
        />
        <Column
          title="Bidang"
          render={(record) => record?.usulans?.[0]?.bidang}
          onCell={(record) => {
            return {
              onClick: () => {
                goToDetailHandler(record?.usulans?.[0]?.id_usulan);
              },
            };
          }}
        />
        <Column
          title="Prodi"
          render={(record) => record?.prodi}
          onCell={(record) => {
            return {
              onClick: () => {
                goToDetailHandler(record?.usulans?.[0]?.id_usulan);
              },
            };
          }}
        />
        <Column
          title="Status Judul"
          onCell={(record) => {
            return {
              onClick: () => {
                goToDetailHandler(record?.usulans?.[0]?.id_usulan);
              },
            };
          }}
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
        <Column
          title="Keterangan"
          render={(record) => record?.usulans?.[0]?.keterangan}
        />
      </TableSidos>
    </Fragment>
  );
};
export default BimbinganLists;

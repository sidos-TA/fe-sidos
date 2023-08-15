import { Table } from "antd";
import { Fragment } from "react";
import { useUsulanFormContext } from "../../context/Usulan/UsulanFormContext";
import ImageSidos from "../../lib/src/components/ImageSidos";
import TableSidos from "../../lib/src/components/TableSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";
import TagDataBidang from "../TagDataBidang";

const { Column } = Table;

const TableSPK = ({ ...props }) => {
  const { openModalHandler, state, rowSelectionHandler, type } =
    useUsulanFormContext();
  const dataCookie = decodeCookie("token");

  return (
    <TableSidos
      {...(type === "edit" && {
        pagination: false,
      })}
      isLoading={state?.isLoadingSPK || state?.isLoadingAdd}
      arrDatas={state?.arrDatasSPK}
      {...(Object.keys(dataCookie)?.length && {
        rowClassName: (record) => {
          if (
            dataCookie?.roles === 1 &&
            record?.n_mhs_usulan === state?.settings?.kuota_bimbingan
          ) {
            return "disabled-row";
          }
        },
        rowSelection: {
          columnTitle: "Usulkan Dospem",
          columnWidth: "50px",
          hideSelectAll: true,
          onChange: rowSelectionHandler,
          selectedRowKeys: state?.arrUsulanDospem,
          getCheckboxProps: (record) => {
            return {
              disabled:
                record?.isDisable &&
                state?.arrUsulanDospem?.length ===
                  state?.settings?.maksimal_usulan,
            };
          },
        },
      })}
      {...props}
    >
      <Column
        title="Foto Dosen"
        render={(record) => {
          return <ImageSidos width={200} src={record?.photo} />;
        }}
      />
      <Column
        onCell={(record) => {
          return {
            onClick: () => {
              openModalHandler(record);
            },
          };
        }}
        title="Nama Dosen"
        dataIndex="name"
      />
      <Column
        onCell={(record) => {
          return {
            onClick: () => {
              openModalHandler(record);
            },
          };
        }}
        title="Mahasiswa yang Mengusulkan"
        render={(record) => {
          return record?.n_mhs_usulan;
        }}
      />
      <Column
        onCell={(record) => {
          return {
            onClick: () => {
              openModalHandler(record);
            },
          };
        }}
        title="Mahasiswa Bimbingan"
        render={(record) => {
          return record?.n_mhs_bimbingan;
        }}
      />
      <Column
        onCell={(record) => {
          return {
            onClick: () => {
              openModalHandler(record);
            },
          };
        }}
        title="SKS"
        dataIndex="sks"
      />
      <Column
        title="Bidang Keahlian"
        onCell={(record) => {
          return {
            onClick: () => {
              openModalHandler(record);
            },
          };
        }}
        render={(record) => {
          const arrBidang = record?.bidangs;

          return (
            <Fragment>
              {arrBidang?.map((data, idx) => (
                <TagDataBidang key={idx} data={data?.bidang} />
              ))}
            </Fragment>
          );
        }}
      />
      <Column
        onCell={(record) => {
          return {
            onClick: () => {
              openModalHandler(record);
            },
          };
        }}
        title="Pendidikan Terakhir"
        dataIndex="pendidikan"
      />
      <Column
        onCell={(record) => {
          return {
            onClick: () => {
              openModalHandler(record);
            },
          };
        }}
        title="Jabatan Fungsional"
        dataIndex="jabatan"
      />
    </TableSidos>
  );
};
export default TableSPK;

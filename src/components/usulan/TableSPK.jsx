import { Table, Tag } from "antd";
import { Fragment } from "react";
import { useUsulanFormContext } from "../../context/Usulan/UsulanFormContext";
import TableSidos from "../../lib/src/components/TableSidos";

const { Column } = Table;

const TableSPK = ({ ...props }) => {
  const { openModalHandler, state, rowSelectionHandler } =
    useUsulanFormContext();

  return (
    <TableSidos
      isLoading={state?.isLoadingSPK || state?.isLoadingAdd}
      arrDatas={state?.arrDatasSPK}
      rowSelection={{
        columnTitle: "Usulkan Dospem",
        columnWidth: "50px",
        hideSelectAll: true,
        onChange: rowSelectionHandler,
        selectedRowKeys: state?.arrUsulanDospem,
        getCheckboxProps: (record) => {
          return {
            disabled: record?.isDisable && state?.arrUsulanDospem?.length === 3,
          };
        },
      }}
      {...props}
    >
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
        dataIndex="n_mhs_usulan"
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
        dataIndex="bidang"
        onCell={(record) => {
          return {
            onClick: () => {
              openModalHandler(record);
            },
          };
        }}
        render={(record) => {
          const arrBidang = JSON.parse(record);

          return (
            <Fragment>
              {arrBidang?.map((data, idx) => (
                <Tag key={idx}>{data}</Tag>
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

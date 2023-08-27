import { Table } from "antd";
import { Fragment } from "react";
import { useUsulanFormContext } from "../../context/Usulan/UsulanFormContext";
import ImageSidos from "../../lib/src/components/ImageSidos";
import TableSidos from "../../lib/src/components/TableSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";
import sameArrObj from "../../lib/src/helpers/sameArrObj";
import ModalDetailDosen from "../SPK/ModalDetailDosen";
import TagDataBidang from "../TagDataBidang";
import TooltipFullBimbingan from "../TooltipFullBimbingan";

const { Column } = Table;

const TableSPK = ({
  arrDatasSPK,
  loadingSPK,
  stateModalDetail,
  setStateModalDetail,
  ...props
}) => {
  const { state, rowSelectionHandler } = useUsulanFormContext();
  const dataCookie = decodeCookie("token");

  const openModalHandler = (record) => {
    setStateModalDetail((prev) => ({
      ...prev,
      isOpenModal: true,
      objDosenDetail: record,
    }));
  };

  return (
    <Fragment>
      <TableSidos
        // {...(type === "edit" && {
        //   pagination: false,
        // })}
        pageSize={5}
        // isLoading={state?.isLoadingSPK || state?.isLoadingAdd}
        isLoading={loadingSPK || state?.isLoadingAdd}
        // arrDatas={state?.arrDatasSPK}
        arrDatas={arrDatasSPK}
        {...(Object.keys(dataCookie)?.length && {
          // rowClassName: (record) => {
          //   if (
          //     dataCookie?.roles === 1 &&
          //     record?.n_mhs_bimbingan === state?.settings?.kuota_bimbingan
          //   ) {
          //     return "disabled-row";
          //   }
          // },
          rowSelection: {
            columnTitle: "Usulkan Dospem",
            columnWidth: "50px",
            hideSelectAll: true,
            onChange: rowSelectionHandler,
            selectedRowKeys: state?.arrUsulanDospem,
            getCheckboxProps: (record) => {
              return {
                disabled: record?.isDisable,
              };
            },
          },
          // onRow: (record) => ({
          //   style: {
          //     background:
          //       dataCookie?.roles === 1 &&
          //       record?.n_mhs_bimbingan === state?.settings?.kuota_bimbingan &&
          //       "#f58a8a",
          //   },
          // }),
        })}
        // components={{
        //   body: {
        //     row: TooltipFullBimbingan,
        //   },
        // }}
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
        {dataCookie?.roles === 1 && (
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
        )}
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
            const arrBidang = sameArrObj({
              arr: record?.bidangs,
              props: "bidang",
            });

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
      <ModalDetailDosen
        setStateModal={setStateModalDetail}
        stateModal={stateModalDetail}
      />
    </Fragment>
  );
};
export default TableSPK;

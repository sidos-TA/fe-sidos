import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Form, message, Modal, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useTabsContext } from "../../../context/TabsContext";
import BtnSidos from "../../../lib/src/components/BtnSidos";
import InputSidos from "../../../lib/src/components/FormSidos/fields/InputSidos";
import LoadingSidos from "../../../lib/src/components/LoadingSidos";
import TableSidos from "../../../lib/src/components/TableSidos/TableSidos";
import catchHandler from "../../../lib/src/helpers/catchHandler";
import { responseSuccess } from "../../../lib/src/helpers/formatRespons";
import sortedArrObj from "../../../lib/src/helpers/sortedArrObj";
import useFetch from "../../../lib/src/helpers/useFetch";
import TitleSection from "../../TitleSection";
import DosenDetailPenelitianModalAdd from "./DosenDetailPenelitian/DosenDetailPenelitianModalAdd";
import DosenDetailPenelitianModalEdit from "./DosenDetailPenelitian/DosenDetailPenelitianModalEdit";
import DosenDetailPenelitianModalSourceEdit from "./DosenDetailPenelitian/DosenDetailPenelitianModalSourceEdit";

const { Column, ColumnGroup } = Table;

const Penelitian = () => {
  const { state, setState } = useTabsContext();
  const [FormSourcePenelitian] = Form.useForm();
  const navigate = useNavigate();
  const fetch = useFetch();
  const [messageApi, contextHolder] = message.useMessage();
  const [modalApi, contextHolderModal] = Modal.useModal();
  let timeout;

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [modalEditState, setModalEditState] = useState({
    data: {},
    visible: false,
  });
  const [rilDataPenelitians, setRilDataPenelitians] = useState([]);

  const [refetchLoading, setRefetchLoading] = useState(false);

  const toggleVisibleModalEdit = (visibleModal) =>
    setModalEditState((prev) => ({
      ...prev,
      visible: visibleModal,
    }));

  const toggleVisibleModalAdd = (visibleModal) =>
    setVisibleModalAdd(visibleModal);

  const endPointLinkHandler = (source_link) => {
    if (source_link) {
      const url = new URL(source_link);
      if (url?.hostname.includes("sinta.kemdikbud")) {
        return "scrapeSINTA";
      } else if (url?.hostname.includes("scholar.google")) {
        return "scrapeGS";
      } else {
        return "";
      }
    }
    return "";
  };

  const reScrapeHandler = (source_link) => {
    setRefetchLoading(true);
    if (endPointLinkHandler(source_link)) {
      fetch({
        endpoint: "rescrapePenelitian",
        payload: {
          link: source_link,
          endpointScrape: endPointLinkHandler(source_link),
          nip: state?.datas?.nip,
          oldArrPenelitian: state.datas.penelitians,
        },
      })
        ?.then((response) => {
          const res = responseSuccess(response);

          if (res?.status === 200) {
            const arrDataPenelitian = res?.data;

            setState((prev) => ({
              ...prev,
              datas: {
                ...state?.datas,
                penelitians: arrDataPenelitian,
              },
            }));
          }
        })
        ?.catch((e) => {
          catchHandler({ e, messageApi, navigate });
        })
        ?.finally(() => {
          setRefetchLoading(false);
        });
    } else {
      messageApi?.open({
        type: "error",
        content:
          "Link penelitian kosong atau linknya bukan google scholar/sinta",
      });
    }
  };

  const deletePenelitianHandler = (id) => {
    fetch({
      endpoint: "deletePenelitianById",
      payload: {
        id,
        nip: state?.datas?.nip,
      },
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res?.status === 200) {
          messageApi?.open({
            type: "success",
            content: res?.message,
            key: "success_delete",
          });
          setState((prev) => ({
            ...prev,
            datas: {
              ...state?.datas,
              penelitians: res?.data,
            },
          }));
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      });
  };

  // console.log(state?.datas);

  return (
    <Fragment>
      {contextHolder}
      {contextHolderModal}

      <TitleSection title="Penelitian" />
      {refetchLoading ? (
        <LoadingSidos spinning={refetchLoading} />
      ) : (
        <TableSidos
          rowKey={(record) => record?.id}
          extraButton={[
            <Tooltip
              key="refetch_1"
              title="Ambil ulang data dari web berdasarkan source penelitian"
            >
              <BtnSidos
                icon={<ReloadOutlined style={{ fontSize: 24 }} />}
                onClick={() =>
                  reScrapeHandler(state?.datas?.linkDataPenelitian)
                }
              >
                Ambil ulang data
              </BtnSidos>
            </Tooltip>,
            <Tooltip
              key="edit_1"
              title={`Source penelitian saat ini : ${state?.datas?.linkDataPenelitian}`}
            >
              <BtnSidos
                icon={<EditOutlined />}
                type="primary"
                onClick={() => setVisibleModal(true)}
              >
                Edit Sumber Penelitian
              </BtnSidos>
            </Tooltip>,
            <BtnSidos
              key="add_manual"
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setVisibleModalAdd(true)}
            >
              Add Data
            </BtnSidos>,
          ]}
          arrDatas={sortedArrObj({
            arrDatas: state?.datas?.penelitians,
            sortType: "DESC",
            key: "id",
          })}
          tableLayout="fixed"
        >
          <Column
            onCell={(record) => {
              return {
                onClick: () => {
                  if (record?.link) {
                    window.open(record?.link, "_blank");
                  }
                },
              };
            }}
            title="Judul"
            render={(record) => record?.judulPenelitian}
          />
          <Column
            title="Tahun"
            render={(record) => record?.tahun}
            onCell={(record) => {
              return {
                onClick: () => {
                  if (record?.link) {
                    window.open(record?.link, "_blank");
                  }
                },
              };
            }}
          />
          <ColumnGroup title="Action">
            <Column
              title="Edit"
              render={(record) => {
                return (
                  <BtnSidos
                    icon={<EditOutlined />}
                    onClick={() => {
                      setModalEditState((prev) => ({
                        ...prev,
                        visible: true,
                        data: record,
                      }));
                    }}
                  >
                    Edit
                  </BtnSidos>
                );
              }}
            />
            <Column
              title="Hapus"
              render={(record) => {
                return (
                  <BtnSidos
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => {
                      modalApi?.confirm({
                        title: "Apakah kamu yakin untuk hapus ini ?",
                        onOk: () => deletePenelitianHandler(record?.id),
                        okText: "Hapus",
                        okButtonProps: {
                          danger: true,
                        },
                      });
                    }}
                  >
                    Hapus
                  </BtnSidos>
                );
              }}
            />
          </ColumnGroup>
        </TableSidos>
      )}

      <DosenDetailPenelitianModalSourceEdit
        form={FormSourcePenelitian}
        reScrapeHandler={reScrapeHandler}
        setVisibleModal={setVisibleModal}
        visibleModal={visibleModal}
      />

      <DosenDetailPenelitianModalEdit
        modalEditState={modalEditState}
        toggleVisibleModalEdit={toggleVisibleModalEdit}
      />

      <DosenDetailPenelitianModalAdd
        visibleModalAdd={visibleModalAdd}
        toggleVisibleModalAdd={toggleVisibleModalAdd}
      />
    </Fragment>
  );
};
export default Penelitian;

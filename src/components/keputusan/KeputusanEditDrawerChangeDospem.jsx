import { Drawer, Form } from "antd";
import { Suspense } from "react";
import { useCallback } from "react";
import { lazy } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import BtnSidos from "../../lib/src/components/BtnSidos";
import LoadingSidos from "../../lib/src/components/LoadingSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";
import useGetSimilaritasJudul from "../../lib/src/helpers/useGetSimilaritasJudul";
import useSetting from "../../lib/src/helpers/useSetting";
import ModalSimilaritasJudul from "../ModalSimilaritasJudul";
import TooltipFullBimbingan from "../TooltipFullBimbingan";

const TableSPK = lazy(() => import("../usulan/TableSPK"));
const FormSPK = lazy(() => import("../usulan/FormSPK"));

const KeputusanEditDrawerChangeDospem = ({
  state,
  setState,
  messageApi,
  judul,
  bidang,
  jdl_from_dosen,
  stateNewDospem,
  setStateNewDospem,
  getSPKHandler,
}) => {
  const [FormEditDospem] = Form.useForm();

  const [stateSimilar, setStateSimilar] = useGetSimilaritasJudul({
    judul: FormEditDospem?.getFieldValue("judul"),
    messageApi,
  });

  const [stateDosenDetail, setStateDosenDetail] = useState({
    isOpenModal: false,
    objDosenDetail: {},
  });

  const stateSetting = useSetting({ messageApi });

  const dataCookie = decodeCookie("token");

  const rowSelectionHandler = (selectedRowKeys) => {
    setStateNewDospem(selectedRowKeys);
    setState((prev) => ({
      ...prev,
      arrDatasSPK: state?.arrDatasSPK?.map((spkData) => {
        if (
          selectedRowKeys?.length === 2 &&
          !selectedRowKeys?.includes(spkData?.nip)
        ) {
          return {
            ...spkData,
            isDisable: true,
          };
        }
        return {
          ...spkData,
          isDisable: false,
        };
      }),
    }));
  };
  const instanceDospem = () => {
    const arrNIPSelected = state?.arrDatasDospem?.map((data) => data?.nip);
    const instanceSelectedDospem = state?.arrDatasSPK.filter((spkData) =>
      arrNIPSelected?.includes(spkData?.nip)
    );

    setState((prev) => ({
      ...prev,
      showTableSPK: true,
      arrDatasSPK: instanceSelectedDospem,
    }));
  };

  const changeDospemHandler = () => {
    const arrNewDospem = state?.arrDatasSPK?.filter((spkData) =>
      stateNewDospem?.includes(spkData?.nip)
    );
    setState((prev) => ({
      ...prev,
      arrDatasDospem: arrNewDospem,
      openModal: false,
    }));
  };

  const closeDrawer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      openModal: false,
      arrDatasSPK: state?.arrDatasSPK?.map((spkData) => ({
        ...spkData,
        isDisable: false,
      })),
    }));

    setStateNewDospem(state?.arrDatasDospem.map((data) => data?.nip));

    FormEditDospem?.setFieldsValue({
      judul,
      bidang,
      jdl_from_dosen,
    });
  }, [state]);

  useEffect(() => {
    instanceDospem();
  }, [state?.openModal]);

  return (
    <Fragment>
      <Drawer
        placement="bottom"
        open={state?.openModal}
        onClose={closeDrawer}
        height={"100vh"}
        title="Ganti Dosen Pembimbing"
        destroyOnClose
      >
        <Suspense fallback={<LoadingSidos />}>
          <FormSPK
            isFromDosen={jdl_from_dosen}
            initialValues={{
              judul,
              bidang,
              jdl_from_dosen,
            }}
            form={FormEditDospem}
            isFromKeputusan
            stateSimilar={stateSimilar}
            getSimilarHandler={() => {
              FormEditDospem.validateFields(["judul"])?.then(() => {
                setStateSimilar((prev) => ({
                  ...prev,
                  isLoadingGetSimilar: true,
                }));
              });
              FormEditDospem?.validateFields;
            }}
          />
        </Suspense>

        <BtnSidos
          type="primary"
          onClick={() => {
            getSPKHandler({
              judul: FormEditDospem?.getFieldValue("judul"),
              bidang: FormEditDospem?.getFieldValue("bidang"),
              jdl_from_dosen:
                FormEditDospem?.getFieldValue("jdl_from_dosen") || "",
            });
          }}
          loading={state?.loadingSPK}
          disabled={stateNewDospem?.length === 2}
          position="center"
        >
          Lihat Rekomendasi
        </BtnSidos>

        {state?.showTableSPK && (
          <Fragment>
            <Suspense fallback={<LoadingSidos />}>
              <TableSPK
                setStateModalDetail={setStateDosenDetail}
                stateModalDetail={stateDosenDetail}
                arrDatasSPK={state?.arrDatasSPK}
                loadingSPK={state?.loadingSPK}
                {...(Object.keys(dataCookie)?.length && {
                  rowClassName: (record) => {
                    if (
                      dataCookie?.roles === 1 &&
                      record?.n_mhs_bimbingan === stateSetting?.kuota_bimbingan
                    ) {
                      return "disabled-row";
                    }
                  },
                  rowSelection: {
                    columnTitle: "Tentukan Dospem",
                    columnWidth: "50px",
                    hideSelectAll: true,
                    onChange: rowSelectionHandler,
                    selectedRowKeys: stateNewDospem,
                    getCheckboxProps: (record) => {
                      return {
                        disabled:
                          record?.isDisable ||
                          record?.n_mhs_bimbingan ===
                            stateSetting?.kuota_bimbingan,
                      };
                    },
                  },
                  // onRow: (record) => {
                  //   return {
                  //     style: {
                  //       background:
                  //         dataCookie?.roles === 1 &&
                  //         record?.n_mhs_bimbingan ===
                  //           stateSetting?.kuota_bimbingan &&
                  //         "#f58a8a",
                  //     },
                  //   };
                  // },
                  components: {
                    body: {
                      row: TooltipFullBimbingan,
                    },
                  },
                })}
              />
            </Suspense>
            <BtnSidos
              type="primary"
              position="center"
              disabled={stateNewDospem?.length !== 2}
              onClick={() => {
                changeDospemHandler();
              }}
            >
              Ganti Dosen Pembimbing
            </BtnSidos>
          </Fragment>
        )}
      </Drawer>
      <ModalSimilaritasJudul
        arrDatas={stateSimilar?.arrDatas}
        closeModal={() => {
          setStateSimilar((prev) => ({
            ...prev,
            openModal: false,
          }));
        }}
        judul={FormEditDospem?.getFieldValue("judul")}
        open={stateSimilar?.openModal}
      />
    </Fragment>
  );
};
export default KeputusanEditDrawerChangeDospem;

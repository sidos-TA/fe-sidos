import { Form, message } from "antd";
import { Fragment, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import FormSPK from "../../components/usulan/FormSPK";
import TableSPK from "../../components/usulan/TableSPK";
import BtnSidos from "../../lib/src/components/BtnSidos";

import UsulanFormContext from "../../context/Usulan/UsulanFormContext";
import useFetch from "../../lib/src/helpers/useFetch";
import {
  responseError,
  responseSuccess,
} from "../../lib/src/helpers/formatRespons";
import decodeCookie from "../../lib/src/helpers/decodeCookie";
import BtnActionUsulan from "../../components/usulan/BtnActionUsulan";
import { useCallback } from "react";
import { useEffect } from "react";
import { lazy } from "react";
import catchHandler from "../../lib/src/helpers/catchHandler";
import sameArr from "../../lib/src/helpers/sameArr";
import ModalSimilaritasJudul from "../../components/ModalSimilaritasJudul";
import useGetSimilaritasJudul from "../../lib/src/helpers/useGetSimilaritasJudul";

// const UsulanDetailModal = lazy(() =>
//   import("../../components/usulan/usulanDetail/UsulanDetailModal")
// );

const UsulanForm = ({ submitEndpoint, titlePage, type = "" }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const fetch = useFetch();
  const { pathname } = useLocation();
  const params = useParams();
  const [loadingUpload, setLoadingUpload] = useState(false);

  const dataCookie = decodeCookie("token");

  const [messageApi, contextHolder] = message.useMessage();

  const [state, setState] = useState({
    mhsName: "",
    objDosenDetail: {},
    arrUsulanDospem: [],
    arrDatasSPK: [],
    isLoadingSPK: false,
    isJdlFromDosen: false,
    isVisibleSPK: false,
    isOpenModal: false,
    isLoadingAdd: false,
    status_usulan: "",
    is_usul: false,
    tingkatan: "",
    settings: {},
    modalSimilaritas: {
      visibleModal: false,
    },
    arrSimilarJudul: [],
    isLoadingGetSimilar: false,
    no_bp: "",
    dsnNameJdlFromDosen: "",
    tahun: "",
    semester: "",
  });

  const [stateDetailDosen, setStateDetailDosen] = useState({
    isOpenModal: false,
    objDosenDetail: {},
  });

  const [stateSimilar, setStateSimilar] = useGetSimilaritasJudul({
    messageApi,
    judul: form?.getFieldValue("judul"),
  });

  const getSimilarJudul = () => {
    setState((prev) => ({ ...prev, isLoadingGetSimilar: true }));
    fetch({
      endpoint: "getSimilaritasJudul",
      payload: {
        judul_mhs: form?.getFieldValue("judul"),
      },
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res?.status === 200) {
          // filter menampilkan judul yg tak sama dg judul yg diusulkan
          const arrSimilarJudul = res?.data?.filter((jdl) => {
            return jdl?.judul !== form?.getFieldValue("judul");
          });
          setState((prev) => ({ ...prev, arrSimilarJudul }));
        }
        openModalSimilaritasJudul(true);
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      })
      ?.finally(() => {
        setState((prev) => ({ ...prev, isLoadingGetSimilar: false }));
      });
  };

  const isDisableRow = (selectedRowKeys) => {
    // kalau kaprodi
    if (dataCookie?.roles === 1 && selectedRowKeys?.length === 2) {
      return true;
    }
    // kalau mhs akhir
    else if (
      dataCookie?.roles === 2 &&
      selectedRowKeys?.length === state?.settings?.maksimal_usulan
    ) {
      return true;
    } else {
      return false;
    }
  };

  const rowSelectionHandler = (selectedRowKeys) => {
    setState((prev) => ({
      ...prev,
      arrUsulanDospem: selectedRowKeys,
      arrDatasSPK: state?.arrDatasSPK?.map((spk) => {
        if (
          !selectedRowKeys?.includes(String(spk?.nip)) &&
          isDisableRow(selectedRowKeys)
        ) {
          return {
            ...spk,
            isDisable: true,
          };
        }
        return {
          ...spk,
          isDisable: false,
        };
      }),
    }));
  };

  const getSPKHandler = (formValue) => {
    setState((prev) => ({
      ...prev,
      isLoadingSPK: true,
    }));

    fetch({
      endpoint: "getSPK",
      payload: {
        judul: formValue?.judul,
        bidang: formValue?.bidang,
        jdl_from_dosen: formValue?.jdl_from_dosen,
      },
    })
      ?.then((res) => {
        const response = responseSuccess(res);

        if (response?.status === 200) {
          setState((prev) => ({
            ...prev,
            arrDatasSPK: response?.data,
            isVisibleSPK: true,
          }));
        }
      })
      ?.catch((e) => {
        const err = responseError(e);
        messageApi.open({
          type: "error",
          content: err?.error,
          key: "error_get_spk",
        });
        setState((prev) => ({
          ...prev,
          isVisibleSPK: false,
        }));
      })
      ?.finally(() => {
        setState((prev) => ({
          ...prev,
          isLoadingSPK: false,
        }));
      });
  };

  const visibleSPKTable = () => {
    form?.validateFields()?.then(() => {
      getSPKHandler({
        ...form?.getFieldsValue(true),
        ...(form?.getFieldValue("isJdlFromDosen") === "tidak" && {
          jdl_from_dosen: "",
        }),
      });
    });

    if (form?.getFieldValue("isJdlFromDosen") === "ya") {
      setState((prev) => ({
        ...prev,
        arrUsulanDospem: sameArr({
          arr: [...state.arrUsulanDospem, form.getFieldValue("jdl_from_dosen")],
        }),
      }));
    }
  };

  const submitUsulan = () => {
    setState((prev) => ({ ...prev, isLoadingAdd: true }));
    fetch({
      endpoint: submitEndpoint,
      payload: {
        ...(state?.status_usulan && {
          status_usulan: state?.status_usulan,
        }),
        nip: state?.arrUsulanDospem,
        no_bp: type === "edit" ? state?.no_bp : dataCookie?.no_bp,
        judul: form?.getFieldValue("judul"),
        bidang: form?.getFieldValue("bidang"),
        jdl_from_dosen: form?.getFieldValue("jdl_from_dosen"),
        ...(type === "edit" && {
          tingkatan: state?.tingkatan,
          id_usulan: params?.id_usulan,
          tahun: state?.tahun,
          semester: state?.semester,
        }),
        file_pra_proposal: form?.getFieldValue("file_pra_proposal"),
      },
    })
      ?.then((res) => {
        const response = responseSuccess(res);
        if (response?.status === 200) {
          messageApi.open({
            type: "success",
            key: "success_submit_usulan",
            content: response?.message,
            duration: 0.8,
            onClose: () => {
              navigate(
                type === "edit" && state?.arrUsulanDospem?.length === 2
                  ? "/keputusan"
                  : "/usulan"
              );
            },
          });
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
        setState((prev) => ({ ...prev, isLoadingAdd: false }));
      });
  };

  const customFetchHandler = useCallback(
    (formData) => {
      setState((prev) => ({
        ...prev,
        isVisibleSPK: formData?.statusUsulan !== "unavailable",
        arrUsulanDospem: formData?.arrDatas?.map((dosen) => dosen?.nip),
        mhsName: formData?.mhs_name,
        arrDatasSPK: formData?.arrDatas,
        is_usul: formData?.is_usul,
        status_usulan: formData?.statusUsulan,
        tingkatan: formData?.tingkatan,
        no_bp: formData?.no_bp,
        dsnNameJdlFromDosen: formData?.jdl_from_dosen?.name,
        tahun: formData?.tahun,
        semester: formData?.semester,
      }));

      form.setFieldsValue({
        judul: formData?.judul,
        bidang: formData?.bidang,
        isJdlFromDosen: Boolean(formData?.jdl_from_dosen),
        jdl_from_dosen: formData?.jdl_from_dosen?.nip,
        file_pra_proposal: formData?.file_pra_proposal,
      });

      // visibleSPKTable();
    },
    [state, form.getFieldsValue()]
  );

  const fetchSettings = () => {
    fetch({
      endpoint: "getSetting",
    })
      ?.then((response) => {
        const res = responseSuccess(response);

        if (res?.status === 200) {
          const objSetting = {};

          for (const [key, val] of Object.entries(res?.data)) {
            objSetting[key] = val;
          }
          setState((prev) => ({
            ...prev,
            settings: {
              ...state?.settings,
              ...objSetting,
            },
          }));
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      });
  };

  const openModalSimilaritasJudul = useCallback(
    (visible) => {
      setState((prev) => ({
        ...prev,
        modalSimilaritas: {
          ...state?.modalSimilaritas,
          visibleModal: visible,
        },
      }));
    },
    [state?.modalSimilaritas?.visibleModal]
  );

  useEffect(() => {
    // if (type === "add" && dataCookie?.roles === 2) {
    // }
    fetchSettings();
  }, []);

  useEffect(() => {
    if (
      type === "edit" &&
      state?.no_bp &&
      dataCookie?.roles === 2 &&
      dataCookie?.no_bp !== state?.no_bp
    ) {
      navigate("/unauth");
    }
  }, [state?.no_bp]);

  return (
    <>
      {contextHolder}
      <UsulanFormContext.Provider
        value={{
          state,
          setState,
          form,
          rowSelectionHandler,
          type,
          submitUsulan,
          openModalSimilaritasJudul,
          getSimilarJudul,
          loadingUpload,
          setLoadingUpload,
        }}
      >
        <TitlePage
          title={pathname === "/spk" ? "Rekomendasi Dospem" : titlePage}
          {...(pathname !== "/spk" && {
            backFn: () => navigate("/usulan"),
          })}
        />

        <FormSPK
          form={form}
          state={state}
          isFromDosen={state?.isJdlFromDosen === "ya"}
          getSimilarHandler={() => {
            form.validateFields(["judul"])?.then(() => {
              setStateSimilar((prev) => ({
                ...prev,
                isLoadingGetSimilar: true,
              }));
            });
          }}
          stateSimilar={stateSimilar}
          setState={setState}
          {...(type === "edit" && {
            customFetch: customFetchHandler,
            endpoint: "getDetailUsulan",
            payloadFetch: {
              id_usulan: params?.id_usulan,
            },
          })}
        />
        <BtnSidos
          // disabled={type === "edit" && state?.arrUsulanDospem?.length === 2 || }
          disabled={
            dataCookie?.roles === 1
              ? state?.arrUsulanDospem?.length === 2
              : state?.arrUsulanDospem?.length >=
                state?.settings?.maksimal_usulan
          }
          loading={state?.isLoadingSPK}
          position="center"
          type="primary"
          onClick={visibleSPKTable}
        >
          Lihat Rekomendasi
        </BtnSidos>
        {state?.isVisibleSPK && (
          <Fragment>
            <TableSPK
              isKaprodi={dataCookie?.roles === 1}
              arrDatasSPK={state?.arrDatasSPK}
              loadingSPK={state?.isLoadingSPK}
              stateModalDetail={stateDetailDosen}
              setStateModalDetail={setStateDetailDosen}
            />

            {state?.status_usulan !== "confirmed" && <BtnActionUsulan />}
          </Fragment>
        )}
        {/* <UsulanDetailModal /> */}
        {/* <UsulanFormModalSimilaritasJudul /> */}
        <ModalSimilaritasJudul
          arrDatas={stateSimilar?.arrDatas}
          open={stateSimilar?.openModal}
          closeModal={() => {
            setStateSimilar((prev) => ({
              ...prev,
              openModal: false,
            }));
          }}
          judul={form?.getFieldValue("judul")}
        />
      </UsulanFormContext.Provider>
    </>
  );
};
export default UsulanForm;

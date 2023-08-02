import { Form, message } from "antd";
import { Fragment, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import FormSPK from "../../components/usulan/FormSPK";
import TableSPK from "../../components/usulan/TableSPK";
import BtnSidos from "../../lib/src/components/BtnSidos";

import UsulanFormContext from "../../context/Usulan/UsulanFormContext";
import UsulanDetailModal from "../../components/usulan/usulanDetail/UsulanDetailModal";
import useFetch from "../../lib/src/helpers/useFetch";
import {
  forbiddenResponse,
  responseError,
  responseSuccess,
  unAuthResponse,
} from "../../lib/src/helpers/formatRespons";
import decodeCookie from "../../lib/src/helpers/decodeCookie";
import decodeBlob from "../../lib/src/helpers/decodeBlob";
import BtnActionUsulan from "../../components/usulan/BtnActionUsulan";
import { useCallback } from "react";
import { useEffect } from "react";

const UsulanForm = ({ submitEndpoint, titlePage, type = "" }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const fetch = useFetch();
  const { pathname } = useLocation();
  const { no_bp } = useParams();
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
  });
  const params = useParams();

  const openModalHandler = (record) => {
    setState((prev) => ({
      ...prev,
      isOpenModal: true,
      objDosenDetail: record,
    }));
  };

  const rowSelectionHandler = (selectedRowKeys) => {
    setState((prev) => ({
      ...prev,
      arrUsulanDospem: selectedRowKeys,
      ...(selectedRowKeys?.length === state?.settings?.maksimal_usulan && {
        arrDatasSPK: state?.arrDatasSPK?.map((spk) => {
          if (!selectedRowKeys?.includes(spk?.nip)) {
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
        ...form?.getFieldsValue(),
        ...(form?.getFieldValue("isJdlFromDosen") === "tidak" && {
          jdl_from_dosen: "",
        }),
      });
    });
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
        no_bp: no_bp && type === "edit" ? no_bp : dataCookie?.no_bp,
        judul: form?.getFieldValue("judul"),
        bidang: form?.getFieldValue("bidang"),
        jdl_from_dosen: form?.getFieldValue("jdl_from_dosen"),
        ...(type === "edit" && {
          status_judul: form?.getFieldValue("status_judul"),
          tingkatan: state?.tingkatan,
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
        const err = responseError(e);
        if (err?.status === 401) {
          unAuthResponse({ messageApi, err });
        } else if (err?.status === 403) {
          forbiddenResponse({ navigate, err });
        } else {
          messageApi.open({
            type: "error",
            key: "error_submit_usulan",
            content: err?.error,
          });
        }
        setState((prev) => ({ ...prev, isLoadingAdd: false }));
      });
  };

  const customFetchHandler = useCallback(
    (formData) => {
      const dataUsulan = formData?.arrDatas?.[0]?.usulans?.[0];

      setState((prev) => ({
        ...prev,
        isVisibleSPK: formData?.statusUsulan !== "unavailable",
        arrUsulanDospem: formData?.arrDatas?.map((dosen) => dosen?.nip),
        mhsName: formData?.mhs_name,
        arrDatasSPK: formData?.arrDatas,
        is_usul: formData?.is_usul,
        status_usulan: formData?.statusUsulan,
        tingkatan: formData?.tingkatan,
      }));

      form.setFieldsValue({
        judul: formData?.judul,
        bidang: formData?.bidang,
        isJdlFromDosen: Boolean(formData?.jdl_from_dosen),
        jdl_from_dosen: formData?.jdl_from_dosen,
        file_pra_proposal: decodeBlob(dataUsulan?.file_pra_proposal, false),
      });
    },
    [state]
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
        const err = responseError(e);
        if (err?.status === 401) {
          unAuthResponse({ messageApi, err });
        } else if (err?.status === 403) {
          forbiddenResponse({ navigate, err });
        } else {
          messageApi.open({
            type: "error",
            key: "errMsg",
            content: err?.error,
          });
        }
      });
  };

  useEffect(() => {
    if (type === "add" && dataCookie?.roles === 2) {
      fetchSettings();
    }
  }, []);

  return (
    <>
      {contextHolder}
      <UsulanFormContext.Provider
        value={{
          state,
          setState,
          form,
          openModalHandler,
          rowSelectionHandler,
          getSPKHandler,
          type,
          submitUsulan,
        }}
      >
        <TitlePage
          title={pathname === "/spk" ? "Rekomendasi Dospem" : titlePage}
          {...(pathname !== "/spk" && {
            backFn: () => navigate("/usulan"),
          })}
        />
        {dataCookie?.roles === 2 && (
          <>Status Usulan: {state?.status_usulan || "in created"}</>
        )}

        <FormSPK
          form={form}
          state={state}
          setState={setState}
          {...(type === "edit" && {
            customFetch: customFetchHandler,
            endpoint: "getUsulanByNoBp",
            payloadSubmit: {
              no_bp: params?.no_bp || dataCookie?.no_bp,
            },
            payloadFetch: {
              no_bp: params?.no_bp || dataCookie?.no_bp,
            },
          })}
        />
        <BtnSidos
          disabled={type === "edit" && state?.arrUsulanDospem?.length === 2}
          loading={state?.isLoadingSPK}
          position="center"
          type="primary"
          onClick={visibleSPKTable}
        >
          Lihat Rekomendasi
        </BtnSidos>
        {state?.isVisibleSPK && (
          <Fragment>
            <TableSPK />

            {state?.status_usulan !== "confirmed" && <BtnActionUsulan />}
          </Fragment>
        )}
        <UsulanDetailModal />
      </UsulanFormContext.Provider>
    </>
  );
};
export default UsulanForm;

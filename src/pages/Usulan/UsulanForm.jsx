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
  responseError,
  responseSuccess,
} from "../../lib/src/helpers/formatRespons";
import RadioSidos from "../../lib/src/components/FormSidos/fields/RadioSidos";
import FormSidos from "../../lib/src/components/FormSidos/form/FormSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

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
    is_usul: false,
    status_usulan: "",
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
      ...(selectedRowKeys?.length === 3 && {
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

  const visibleSPKTable = async () => {
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
        nip: state?.arrUsulanDospem,
        no_bp: no_bp && type === "edit" ? no_bp : "1911082006",
        judul: form?.getFieldValue("judul"),
        bidang: form?.getFieldValue("bidang"),
        jdl_from_dosen: form?.getFieldValue("jdl_from_dosen"),
        ...(type === "edit" && {
          status_judul: form?.getFieldValue("status_judul"),
        }),
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
              navigate(type === "edit" ? "/bimbingan" : "/usulan");
            },
          });
        }
      })
      ?.catch((e) => {
        const err = responseError(e);
        messageApi.open({
          type: "error",
          key: "error_submit_usulan",
          content: err?.error,
        });
        setState((prev) => ({ ...prev, isLoadingAdd: false }));
      });
  };

  const customFetchHandler = (formData) => {
    if (formData?.length) {
      const [formDataValue] = formData;

      setState((prev) => ({
        ...prev,
        isVisibleSPK: true,
        arrUsulanDospem: formDataValue?.dosen?.map((dosen) => dosen?.nip),
        mhsName: formDataValue?.mh?.name,
        arrDatasSPK: formDataValue?.dosen?.map((data) => ({
          ...data,
          // isDisable: true,
        })),
        is_usul: formDataValue?.mh?.is_usul,
        status_usulan: formDataValue?.status_usulan,
      }));

      form.setFieldsValue(formDataValue);
    } else {
      messageApi.open({
        type: "warning",
        content: "Data tidak tersedia",
        key: "not available",
      });

      navigate("/usulan");
    }
  };

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
          setState={setState}
          {...(type === "edit" && {
            customFetch: customFetchHandler,
            endpoint: "getUsulanById",
            ...(Object.keys(params || {})?.length && {
              payload: {
                no_bp: params?.no_bp,
              },
            }),
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

            {type === "edit" && (
              <FormSidos form={form}>
                <RadioSidos
                  required
                  label="Status Judul"
                  name="status_judul"
                  listOptions={[
                    {
                      label: "Terima",
                      value: "terima",
                    },
                    {
                      label: "Tolak",
                      value: "tolak",
                    },
                  ]}
                />
              </FormSidos>
            )}
            {dataCookie?.roles !== 1 ||
            (state?.is_usul && state?.status_usulan === "confirm") ? (
              <Fragment />
            ) : (
              <BtnSidos
                loading={state?.isLoadingAdd}
                disabled={
                  state?.arrUsulanDospem?.length !== (type === "edit" ? 2 : 3)
                }
                position="center"
                type="primary"
                onClick={() => {
                  form.validateFields()?.then(() => {
                    submitUsulan();
                  });
                }}
              >
                {type === "edit" ? "Tambah Bimbingan" : "Usulkan"}
              </BtnSidos>
            )}
          </Fragment>
        )}

        <UsulanDetailModal />
      </UsulanFormContext.Provider>
    </>
  );
};
export default UsulanForm;

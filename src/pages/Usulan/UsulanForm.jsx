import { Form, message } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const UsulanForm = ({ submitEndpoint, titlePage, type = "" }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const fetch = useFetch();
  const [state, setState] = useState({
    isJdlFromDosen: false,
    isVisibleSPK: false,
    isOpenModal: false,
    objDosenDetail: {},
    arrUsulanDospem: [],
    arrDatasSPK: [],
    isLoadingSPK: false,
    mhsName: "",
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
          }));
        }
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
      setState({
        ...state,
        isVisibleSPK: true,
      });
      getSPKHandler({
        ...form?.getFieldsValue(),
        ...(form?.getFieldValue("isJdlFromDosen") === "tidak" && {
          jdl_from_dosen: "",
        }),
      });
    });
  };

  const submitUsulan = () => {
    fetch({
      endpoint: submitEndpoint,
      payload: {
        nip: state?.arrUsulanDospem,
        no_bp: "1911082004",
        judul: form?.getFieldValue("judul"),
        bidang: form?.getFieldValue("bidang"),
        jdl_from_dosen: form?.getFieldValue("jdl_from_dosen"),
      },
    })
      ?.then((res) => {
        const response = responseSuccess(res);
        if (response?.status === 200) {
          message.success({
            key: "send",
            content: response?.message,
            duration: 1.3,
            onClose: () => {
              navigate("/usulan");
            },
          });
        }
      })
      ?.catch((e) => {
        const err = responseError(e);
        message.error({
          key: "send",
          content: err?.error,
          duration: 2,
        });
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
          isDisable: true,
        })),
      }));

      form.setFieldsValue(formDataValue);
    } else {
      message.warning({
        content: "Data tidak tersedia",
        key: "not available",
      });
      navigate("/usulan");
    }
  };

  return (
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
      <TitlePage isBack title={titlePage} backFn={() => navigate("/usulan")} />
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
        disabled={type === "edit"}
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

          <BtnSidos
            disabled={state?.arrUsulanDospem?.length < 3}
            position="center"
            type="primary"
            onClick={() => submitUsulan()}
          >
            {type === "edit" ? "Tambah Bimbingan" : "Usulkan"}
          </BtnSidos>
        </Fragment>
      )}

      <UsulanDetailModal />
    </UsulanFormContext.Provider>
  );
};
export default UsulanForm;

import { message, Table } from "antd";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import FilterSemester from "../../components/FilterSemester";
import TitlePage from "../../components/TitlePage";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import RadioSidos from "../../lib/src/components/FormSidos/fields/RadioSidos";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import LoadingSidos from "../../lib/src/components/LoadingSidos";
import TableSidos from "../../lib/src/components/TableSidos";
import catchHandler from "../../lib/src/helpers/catchHandler";
import decodeCookie from "../../lib/src/helpers/decodeCookie";
import { responseSuccess } from "../../lib/src/helpers/formatRespons";
import useFetch from "../../lib/src/helpers/useFetch";

const { Column } = Table;
const UsulanLists = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});
  const [arrDataUsulans, setArrDataUsulans] = useState([]);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [isMhsUsul, setIsMhsUsul] = useState(false);
  let timeout;
  const dataCookie = decodeCookie("token");
  const fetch = useFetch();
  const [messageApi, contextHolder] = message.useMessage();
  const [settingData, setSettingData] = useState({
    semester: "",
    tahun: "",
  });

  const getSetting = () => {
    fetch({
      endpoint: "getSetting",
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res?.status === 200) {
          setSettingData((prev) => ({
            ...prev,
            semester: res?.data?.semester,
            tahun: res?.data?.tahun,
          }));
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      });
  };

  const searchFilter = ({ key, value }) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setPayload({
        ...payload,
        [key]: value,
      });
    }, 300);
  };

  const goDetailHandler = (record) => {
    navigate(`usulan_edit/${record?.id_usulan}`);
  };

  useEffect(() => {
    getSetting();
  }, []);

  return (
    <Fragment>
      {contextHolder}
      <TitlePage
        title="Data Usulan"
        {...(dataCookie?.roles === 2 &&
          dataCookie?.tahun === settingData?.tahun &&
          dataCookie?.semester === settingData?.semester && {
            addRoute: "usulan_Add",
          })}
      />
      {dataCookie?.roles === 1 && (
        <FilterSemester payloadState={payload} setStatePayload={setPayload} />
      )}
      <TableSidos
        usePaginateBE
        endpoint="getUsulan"
        payload={{
          ...payload,
          ...(dataCookie?.roles === 2 && {
            no_bp: dataCookie?.no_bp,
            tahun: dataCookie?.tahun,
            semester: dataCookie?.semester,
          }),
        }}
        tableLayout="fixed"
        customFilter={[
          <InputSidos
            label="Nama Mahasiswa"
            formItemObj={{ labelCol: { span: 24 } }}
            key="namamhs"
            placeholder="Nama Mahasiswa"
            onChange={(value) => {
              searchFilter({
                key: "name",
                value,
              });
            }}
          />,
          <SelectSidos
            key="bidang"
            label="bidang"
            allowClear
            selectLabel="bidang"
            selectValue="bidang"
            endpoint="getDataBidang"
            onChange={(value) => {
              searchFilter({
                key: "bidang",
                value,
              });
            }}
          />,
          <SelectSidos
            key="prodi"
            allowClear
            label="Prodi"
            endpoint="getAllProdi"
            selectLabel="prodiName"
            selectValue="prodiName"
            onChange={(value) => {
              searchFilter({
                key: "prodi",
                value,
              });
            }}
          />,
        ]}
      >
        <Column
          onCell={(record) => {
            return {
              onClick: () => {
                goDetailHandler(record);
              },
            };
          }}
          title="Nama Mahasiswa"
          render={(record) => {
            return <p>{record?.mh?.name}</p>;
          }}
        />
        <Column
          onCell={(record) => {
            return {
              onClick: () => {
                goDetailHandler(record);
              },
            };
          }}
          title="Prodi"
          render={(record) => {
            return <p>{record?.mh?.prodi}</p>;
          }}
        />
        <Column
          onCell={(record) => {
            return {
              onClick: () => {
                goDetailHandler(record);
              },
            };
          }}
          title="Judul"
          dataIndex="judul"
        />
        <Column
          title="Bidang"
          dataIndex="bidang"
          onCell={(record) => {
            return {
              onClick: () => {
                goDetailHandler(record);
              },
            };
          }}
        />
        <Column
          title="Status Usulan"
          dataIndex="status_usulan"
          onCell={(record) => {
            return {
              onClick: () => {
                goDetailHandler(record);
              },
            };
          }}
        />
      </TableSidos>
    </Fragment>
  );
};

export default UsulanLists;

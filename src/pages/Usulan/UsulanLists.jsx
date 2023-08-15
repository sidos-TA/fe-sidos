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

  const fetchDatas = () => {
    setIsLoadingFetch(true);
    fetch({
      endpoint: "getUsulan",
      payload: {
        ...payload,
        ...(dataCookie?.roles === 2 && {
          no_bp: dataCookie?.no_bp,
        }),
      },
    })
      ?.then((response) => {
        const res = responseSuccess(response);
        if (res?.status === 200) {
          setIsMhsUsul(Boolean(res?.data?.length));
          setArrDataUsulans(res?.data);
        }
      })
      ?.catch((e) => {
        catchHandler({ e, messageApi, navigate });
      })
      ?.finally(() => {
        setIsLoadingFetch(false);
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
    fetchDatas();
  }, [JSON.stringify(payload)]);

  return (
    <Fragment>
      {contextHolder}
      <TitlePage
        title="Data Usulan"
        {...(dataCookie?.roles === 2 && {
          addRoute: "usulan_Add",
        })}
        // {...(!isMhsUsul &&
        //   dataCookie?.roles === 2 && {
        //     addRoute: "usulan_Add",
        //   })}
      />
      {dataCookie?.roles === 1 && (
        <FilterSemester payloadState={payload} setStatePayload={setPayload} />
      )}
      <TableSidos
        endpoint="getUsulan"
        payload={payload}
        // arrDatas={arrDataUsulans}
        tableLayout="fixed"
        // isLoading={isLoadingFetch}
        customFilter={[
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

import { Table } from "antd";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterSemester from "../../components/FilterSemester";
import TitlePage from "../../components/TitlePage";
import tingkatanProdiList from "../../constants/tingkatanProdiList";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import TableSidos from "../../lib/src/components/TableSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";
import isStringParseArray from "../../lib/src/helpers/isStringParseArray";

const { Column } = Table;
const ForbiddenMethodLists = () => {
  const [payload, setPayload] = useState();
  let timeout;
  const dataCookie = decodeCookie("token");
  const navigate = useNavigate();

  const searchFilter = ({ key, value }) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setPayload({
        ...payload,
        [key]: value,
      });
    }, 300);
  };
  return (
    <Fragment>
      <TitlePage
        {...(dataCookie?.roles === 1 && {
          addRoute: "forbidden_methods_Add/input_manual",
        })}
        title="Metode yang tidak diterima"
      />
      <FilterSemester payloadState={payload} setStatePayload={setPayload} />
      <TableSidos
        payload={payload}
        tableLayout="fixed"
        endpoint="getforbidmethods"
        {...(dataCookie?.roles === 1 && {
          onRow: (record) => {
            return {
              onClick: () => {
                navigate(`forbidden_methods_Edit/${record?.id}`);
              },
            };
          },
        })}
        customFilter={[
          <InputSidos
            key="methodName"
            label="Nama Method"
            onChange={(value) => {
              searchFilter({
                key: "methodName",
                value,
              });
            }}
          />,
          <SelectSidos
            key="bidang"
            label="Bidang"
            allowClear
            endpoint="getDataBidang"
            selectLabel="bidang"
            selectValue="bidang"
            onChange={(value) => {
              searchFilter({
                key: "bidang",
                value,
              });
            }}
          />,
          <SelectSidos
            key="tingkatan"
            label="Tingkatan"
            allowClear
            listOptions={tingkatanProdiList}
            onChange={(value) => {
              searchFilter({
                key: "tingkatan",
                value,
              });
            }}
          />,
        ]}
      >
        <Column title="Nama Method" dataIndex="methodName" />
        <Column
          title="Bidang"
          render={(record) => {
            return record?.bidang;
          }}
        />
        <Column title="Tingkatan" dataIndex="tingkatan" />
        <Column title="Semester" dataIndex="semester" />
        <Column title="Tahun" dataIndex="tahun" />
      </TableSidos>
    </Fragment>
  );
};

export default ForbiddenMethodLists;

import { Table } from "antd";
import { Fragment, useState } from "react";
import TitlePage from "../../components/TitlePage";
import tingkatanProdiList from "../../constants/tingkatanProdiList";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import TableSidos from "../../lib/src/components/TableSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const { Column } = Table;
const ForbiddenMethods = () => {
  const [payload, setPayload] = useState();
  let timeout;
  const dataCookie = decodeCookie("token");

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
          addRoute: "forbidden_methods_Add",
        })}
        title="Metode yang tidak diterima"
      />
      <TableSidos
        payload={payload}
        endpoint="getforbidmethods"
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
            key="tingkatan"
            label="Tingkatan"
            allowClear
            listOptions={tingkatanProdiList}
            onChange={(value) => {
              searchFilter({
                key: "methodName",
                value,
              });
            }}
          />,
        ]}
      >
        <Column title="Nama Method" />
        <Column title="Tingkatan" />
      </TableSidos>
    </Fragment>
  );
};

export default ForbiddenMethods;

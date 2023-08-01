import { Table } from "antd";
import { Fragment } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TitlePage from "../../components/TitlePage";
import tingkatanProdiList from "../../constants/tingkatanProdiList";
import InputSidos from "../../lib/src/components/FormSidos/fields/InputSidos";
import SelectSidos from "../../lib/src/components/FormSidos/fields/SelectSidos";
import TableSidos from "../../lib/src/components/TableSidos/TableSidos";
import decodeCookie from "../../lib/src/helpers/decodeCookie";

const { Column } = Table;
const JudulLists = () => {
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
        title="Data Judul"
        {...(dataCookie?.roles === 1 && {
          addRoute: "judul_add/input_manual",
        })}
      />
      <TableSidos
        payload={{
          ...payload,
          // , status_judul: "terima"
        }}
        tableLayout="fixed"
        endpoint="getJudul"
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`judul_Edit/${record?.id}`);
            },
          };
        }}
        customFilter={[
          <InputSidos
            key="judul"
            label="Judul"
            allowClear
            onChange={(value) => {
              searchFilter({ key: "judul", value });
            }}
          />,
          <SelectSidos
            key="bidang"
            label="Bidang"
            allowClear
            endpoint="getDataBidang"
            onChange={(value) => {
              searchFilter({ key: "bidang", value });
            }}
          />,
          <SelectSidos
            key="tingkatan"
            label="Tingkatan"
            allowClear
            listOptions={tingkatanProdiList}
            onChange={(value) => {
              searchFilter({ key: "tingkatan", value });
            }}
          />,
        ]}
      >
        <Column title="Judul" render={(record) => record?.judul} />
        <Column title="Bidang" render={(record) => record?.bidang} />
        <Column title="Tingkatan" render={(record) => record?.tingkatan} />
      </TableSidos>
    </Fragment>
  );
};
export default JudulLists;

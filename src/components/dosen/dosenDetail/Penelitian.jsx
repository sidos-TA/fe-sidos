import { Table } from "antd";
import { Fragment } from "react";
import { useTabsContext } from "../../../context/TabsContext";
import InputSidos from "../../../lib/src/components/FormSidos/fields/InputSidos";
import TableSidos from "../../../lib/src/components/TableSidos/TableSidos";
import sameArrObj from "../../../lib/src/helpers/sameArrObj";
import TitleSection from "../../TitleSection";

const { Column } = Table;

const Penelitian = () => {
  const { state } = useTabsContext();

  return (
    <Fragment>
      <TitleSection title="Penelitian" />
      <TableSidos
        arrDatas={sameArrObj({
          arr: JSON.parse(state?.datas?.penelitian),
          props: "title",
        })}
        tableLayout="fixed"
        customFilter={[<InputSidos key="judul" label="Judul" />]}
      >
        <Column
          title="Judul"
          onCell={(record) => {
            return {
              onClick: () => {
                if (record?.link_title) {
                  window.open(record?.link_title, "_blank");
                }
              },
            };
          }}
          render={(record) => record?.title}
        />
      </TableSidos>
    </Fragment>
  );
};
export default Penelitian;

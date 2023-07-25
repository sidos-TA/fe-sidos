import { Col, Row, Table } from "antd";
import { Fragment } from "react";
import { useUsulanFormContext } from "../../../context/Usulan/UsulanFormContext";
import TableSidos from "../../../lib/src/components/TableSidos";

const { Column } = Table;
const UsulanDetailPenelitian = () => {
  const { state } = useUsulanFormContext();
  const dosenDetail = state?.objDosenDetail;
  return (
    <Fragment>
      {JSON.parse(dosenDetail?.penelitian || "[]")?.length ? (
        <Row>
          <Col span={24}>
            <TableSidos
              arrDatas={JSON.parse(dosenDetail?.penelitian || "[]")}
              pagination={false}
              onRow={(record) => {
                return {
                  onClick: () => {
                    if (record?.link_title) {
                      window.open(record?.link_title, "_blank");
                    }
                  },
                };
              }}
            >
              <Column title="Judul Penelitian" dataIndex="title" />
            </TableSidos>
          </Col>
        </Row>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

export default UsulanDetailPenelitian;

import { Col, Row, Table } from "antd";
import { Fragment } from "react";
import { useUsulanAddContext } from "../../../context/Usulan/UsulanAddContext";
import TableSidos from "../../../lib/src/components/TableSidos";

const { Column } = Table;
const UsulanDetailPenelitian = () => {
  const { state } = useUsulanAddContext();
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
                    if (record?.link) {
                      window.open(record?.link, "_blank");
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

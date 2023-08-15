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
      {dosenDetail?.penelitians?.length ? (
        <Row>
          <Col span={24}>
            <TableSidos
              arrDatas={dosenDetail?.penelitians}
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
              <Column title="Judul Penelitian" dataIndex="judulPenelitian" />
              <Column title="Tahun" dataIndex="tahun" />
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

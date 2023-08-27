import { Card, Popover, Space, Typography } from "antd";

const CardResult = ({
  data,
  propsCardTitle,
  propsCardSubtitle,
  setModalState,
}) => {
  return (
    <Popover
      style={{ color: "white" }}
      content={
        <Space direction="vertical">
          {Object.keys(data)
            ?.filter((dataKey) => dataKey !== "id")
            ?.map((keyDataFile, idxKeyDataFile) => (
              <Typography.Text key={idxKeyDataFile}>
                <span style={{ fontWeight: "bold" }}>{keyDataFile}</span> :{" "}
                {data?.[keyDataFile]}
              </Typography.Text>
            ))}
        </Space>
      }
    >
      <Card
        style={{ cursor: "pointer", width: 300 }}
        onClick={() => {
          setModalState((prev) => ({
            ...prev,
            data,
            visible: true,
          }));
        }}
        title={
          <Typography.Text style={{ width: 100 }}>
            {data?.[propsCardTitle]}
          </Typography.Text>
        }
      >
        {
          <Typography.Text style={{ width: 100 }}>
            {data?.[propsCardSubtitle]}
          </Typography.Text>
        }
      </Card>
    </Popover>
  );
};
export default CardResult;

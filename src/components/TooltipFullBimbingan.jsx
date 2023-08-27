import { Tooltip } from "antd";

const TooltipFullBimbingan = (props) => {
  if (props?.className?.includes("disabled-row")) {
    const record = props?.children?.[0]?.props?.record;
    return (
      <Tooltip title={`Kuota bimbingan dosen ${record?.name} telah penuh`}>
        <tr {...props} />
      </Tooltip>
    );
  }
  return <tr {...props} />;
};
export default TooltipFullBimbingan;

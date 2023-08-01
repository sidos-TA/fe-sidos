import { KeyOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import jabatanList from "../../../../constants/jabatanList";
import pendidikanList from "../../../../constants/pendidikanList";
import { useDosenDetailProfileContext } from "../../../../context/Dosen/DosenDetail/DosenDetailProfileContext";
import BtnSidos from "../../../../lib/src/components/BtnSidos";
import LabelSidos from "../../../../lib/src/components/FormSidos/fields/LabelSidos";

const DosenDetailProfileField = () => {
  const { updateField, stateTabs, state, toggleModalPassword } =
    useDosenDetailProfileContext();

  return (
    <Space direction="vertical" size={32}>
      <LabelSidos
        label="NIP"
        onChange={(val) => {
          updateField({ field: "nip", val });
        }}
      >
        {stateTabs?.datas?.nip}
      </LabelSidos>
      <LabelSidos
        isEditable
        type="text"
        defaultValue={state?.profileIdentity?.name || stateTabs?.datas?.name}
        label="Name"
        onChange={(val) => {
          updateField({ field: "name", val });
        }}
      >
        {state?.profileIdentity?.name || stateTabs?.datas?.name}
      </LabelSidos>
      <LabelSidos
        isEditable
        type="number"
        defaultValue={state?.profileIdentity?.sks || stateTabs?.datas?.sks}
        label="SKS"
        onChange={(val) => {
          updateField({ field: "sks", val });
        }}
      >
        {state?.profileIdentity?.sks || stateTabs?.datas?.sks}
      </LabelSidos>

      <LabelSidos
        type="select"
        listOptions={jabatanList}
        showSearch
        label="Jabatan"
        defaultValue={
          state?.profileIdentity?.jabatan || stateTabs?.datas?.jabatan
        }
        isEditable
        onChange={(val) => {
          updateField({ field: "jabatan", val });
        }}
      >
        {state?.profileIdentity?.jabatan || stateTabs?.datas?.jabatan}
      </LabelSidos>
      <LabelSidos
        type="select"
        showSearch
        listOptions={pendidikanList}
        label="Pendidikan"
        isEditable
        defaultValue={
          state?.profileIdentity?.pendidikan || stateTabs?.datas?.pendidikan
        }
        onChange={(val) => {
          updateField({ field: "pendidikan", val });
        }}
      >
        {state?.profileIdentity?.pendidikan || stateTabs?.datas?.pendidikan}
      </LabelSidos>

      <Typography>Password</Typography>
      <BtnSidos
        icon={<KeyOutlined />}
        type="dashed"
        onClick={() => toggleModalPassword(true)}
      >
        Ganti password
      </BtnSidos>
    </Space>
  );
};
export default DosenDetailProfileField;

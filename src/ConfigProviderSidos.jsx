import { ConfigProvider } from "antd";

const ConfigProviderSidos = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 18,
          fontFamily: "Poppins",
          colorText: "#4a4a4a",
        },
        components: {
          Menu: {
            itemSelectedColor: "white",
            itemSelectedBg: "#4096ff",
            itemHoverColor: "#1677ff",
            itemHoverBg: "#e6f4ff",
            itemBg: "white",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ConfigProviderSidos;

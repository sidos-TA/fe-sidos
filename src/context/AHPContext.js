import { createContext, useContext } from "react";

const AHPContext = createContext({});

const useAHPContext = () => useContext(AHPContext);

export { useAHPContext };
export default AHPContext;

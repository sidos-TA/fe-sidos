import { createContext, useContext } from "react";

const UsulanFormContext = createContext({});

export const useUsulanFormContext = () => useContext(UsulanFormContext);

export default UsulanFormContext;

import { createContext, useContext } from "react";

const UsulanAddContext = createContext({});

export const useUsulanAddContext = () => useContext(UsulanAddContext);

export default UsulanAddContext;

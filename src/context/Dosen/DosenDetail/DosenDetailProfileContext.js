import { useContext } from "react";
import { createContext } from "react";

const DosenDetailProfileContext = createContext({});

export const useDosenDetailProfileContext = () =>
  useContext(DosenDetailProfileContext);

export default DosenDetailProfileContext;

import { useContext } from "react";
import { createContext } from "react";

const DosenAddGetFromLinkContext = createContext({});

export const useDosenAddGetFromLinkContext = () =>
  useContext(DosenAddGetFromLinkContext);

export default DosenAddGetFromLinkContext;

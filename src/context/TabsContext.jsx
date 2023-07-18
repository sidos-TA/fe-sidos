import { createContext, useContext } from "react";

const TabsContext = createContext({});

export const useTabsContext = () => useContext(TabsContext);

export default TabsContext;

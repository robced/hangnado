import {
  AppContext,
  AppContextProps,
} from "../interfaces/AppContext.interface";
import {createContext, useContext, useState } from "react";

const Context = createContext({} as AppContext);

export const StateContext = ({ children }: AppContextProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <Context.Provider value={{ loading, setLoading }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

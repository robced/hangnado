import { Dispatch, PropsWithChildren, SetStateAction } from "react";

export interface AppContext {
  loading: Boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface AppContextProps extends PropsWithChildren {
}

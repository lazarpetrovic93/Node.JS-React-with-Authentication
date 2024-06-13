import React, { createContext, Dispatch, ReactNode, useReducer } from "react";
import { AuthActions, authReducer } from "./authReducer";

export type User = {
  token: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type InitialStateType = {
  auth: User;
};

const initialState = {
  auth: {
    token: "",
    first_name: "",
    last_name: "",
    email: "",
  },
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<AuthActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ auth }: InitialStateType, action: AuthActions) => ({
  auth: authReducer(auth, action as AuthActions),
});

const AppProvider = ({ children }: Record<string, ReactNode>) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };

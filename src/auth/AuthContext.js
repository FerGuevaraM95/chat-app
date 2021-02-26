import { createContext, useCallback, useState } from "react";

import { fetchWithoutToken } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null
};

export const AuthProvider = ({children}) => {

  const [auth, setAuth] = useState(initialState);

  const login = async (email, password) => {

    const res = await fetchWithoutToken('login', {email, password}, 'POST');

    console.log(res);

  };

  const register = (name, email, password) => {

  };

  const checkToken = useCallback(() =>{}, []);

  const logout = () => {

  };

  return (
    <AuthContext.Provider
      value={{
          login,
          register,
          checkToken,
          logout,
      }}
    >
      { children }
    </AuthContext.Provider>
  );
};

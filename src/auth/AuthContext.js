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

    if(res.ok) {
      localStorage.setItem('token', res.token);

      const { user: { uid, name, email } } = res;

      setAuth({
        uid,
        name,
        email,
        checking: false,
        logged: true,
      });

    };

    return res.ok;

  };

  const register = (name, email, password) => {

  };

  const checkToken = useCallback(() =>{}, []);

  const logout = () => {

  };

  return (
    <AuthContext.Provider
      value={{
          auth,
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

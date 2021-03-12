import { createContext, useCallback, useState, useContext } from "react";

import { ChatContext } from "../context/chat/ChatContext";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext)

  const login = async (email, password) => {
    const res = await fetchWithoutToken("login", { email, password }, "POST");

    if (res.ok) {
      localStorage.setItem("token", res.token);

      const {
        user: { uid, name, email },
      } = res;

      setAuth({
        uid,
        name,
        email,
        checking: false,
        logged: true,
      });

    }

    return res.ok;
  };

  const register = async (name, email, password) => {
    const res = await fetchWithoutToken(
      "login/new",
      { name, email, password },
      "POST"
    );

    if (res.ok) {
      localStorage.setItem("token", res.token);

      const {
        user: { uid, name, email },
      } = res;

      setAuth({
        uid,
        name,
        email,
        checking: false,
        logged: true,
      });

      console.log("Registrado!");
      return true;
    }

    return res.msg;
  };

  const checkToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;

    };

    const res = await fetchWithToken('login/renew');

    if (res.ok) {
      localStorage.setItem("token", res.token);

      const { user: { uid, name, email } } = res;

      setAuth({
        uid,
        name,
        email,
        checking: false,
        logged: true,
      });

      return true;
    } else {
      setAuth({
        uid: null,
        name: null,
        email: null,
        checking: false,
        logged: false,
      });

      return false;
    };

  }, []);

  const logout = () => {
    localStorage.removeItem('token');

    dispatch({
      type: types.closeSession
    });

    setAuth({
      checking: false,
      logged: false,
    });
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
      {children}
    </AuthContext.Provider>
  );
};

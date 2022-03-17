import { createContext, useState } from "react";

export const AuthContext = createContext({ token: {}, handleToken: () => {} });

export const AuthContextProvider = ({ children }) => {
  console.log("authcontext");
  const [token, setToken] = useState({});
  const handleToken = (toke) => {
    setToken(toke);
  };

  return (
    <AuthContext.Provider value={{ token, handleToken }}>
      {children}
    </AuthContext.Provider>
  );
};
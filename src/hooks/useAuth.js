import { useContext, createContext } from "react";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

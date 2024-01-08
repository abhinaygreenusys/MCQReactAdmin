import { useContext } from "react";
import PassContext from "./PassContext";

export const useContextValue = () => {
  const { loggedUser, setLoggedUser } = useContext(PassContext);
  return { loggedUser, setLoggedUser };
};
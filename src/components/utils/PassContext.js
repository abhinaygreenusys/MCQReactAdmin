import { createContext } from "react";

const PassContext = createContext({
  loggedUser: "",
  setLoggedUser: () => {},
});

export default PassContext;

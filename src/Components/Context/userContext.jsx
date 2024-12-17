import { createContext, useContext, useState, useEffect } from "react";
import { BASEURL } from "../../../constans/index";
import axios from "axios";

// create Context
export const userContext = createContext();
export default function UserContextProvider(props) {

  let [userToken, setUserToken] = useState(null);
  let [userData, setUserData] = useState(null);
  let [user, setUser] = useState(null);
  // logIn

  const login = (values) => {
    return axios
      .post(`${BASEURL}/admin/login`, values)
      .then((response) => {
        setUserData(response?.data);
        setUserToken(response?.data.token);
        localStorage.setItem("usertoken", response?.data.token);
        return response;
      })
      .catch((err) => err);
  };

  
  return (
    <userContext.Provider
      value={{ userToken, setUserToken, login, userData, user, setUserData }}
    >
      {props.children}
    </userContext.Provider>
  );
}

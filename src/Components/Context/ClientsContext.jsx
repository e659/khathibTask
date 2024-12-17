import { createContext, useContext, useState, useEffect } from "react";
import { BASEURL } from "../../../constans/index";
import axios from "axios";

// create Context
export const clientsContext = createContext();
export default function ClientsContextProvider(props) {
  let [clients, setClients] = useState([]);
  // get allClients
  function getAllClients() {
    return axios
      .get(`${BASEURL}/client/get_all_client?search=hani`)
      .then((response) => {
        console.log("eeeeeeeeeeee")
        setClients(response?.data);
        return response;
      })
      .catch((err) => err);
  }
 
  return (
    <clientsContext.Provider value={{getAllClients,clients,setClients}}>
      {props.children}
    </clientsContext.Provider>
  );
}

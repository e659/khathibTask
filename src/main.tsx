import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter} from 'react-router-dom'
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import botstrap files
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import UserContextProvider from "./Components/Context/userContext.jsx";
import ClientsContextProvider from "./Components/Context/ClientsContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
const root = ReactDOM.createRoot(document.getElementById("root"));
// take instanse from reactQuery
const queryClient = new QueryClient();
root.render(

  <ClientsContextProvider>
    <UserContextProvider>
    
      <App />
     
    </UserContextProvider>
  </ClientsContextProvider>
);

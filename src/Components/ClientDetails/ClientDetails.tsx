import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import HeaderBox from "../HeaderBox/HeaderBox";
import OverFlowBox from "../OverFlowBox/OverFlowBox";
import DataTable from "../DataTable/DataTable";
import { useParams } from "react-router-dom";
import axios from "axios";
import ClientDetailsData from "./ClientDetailsData";
import ClientDetailsDataTable from "./ClientDetailsDataTable";
import { BASEURL } from "../../../constans/index";
export default function ClientDetails() {
  const [client, setClient] = useState([]);
  const [query, setQuery] = useState("");
  const { clientId } = useParams();
  // sidebar functions
  const [menuCollapse, setMenuCollapse] = useState(false);
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const [menuToggle, setMenuToggle] = useState(false);

  const handleToggleSidebar = (value: any) => {
    setMenuToggle(value);
  };
  //   getOneClient
  async function getOneClient(searchQuery) {
    const params = new URLSearchParams({
      search: searchQuery,
      page: 1,
      limit: 20,
    });
    const response = await axios
      .get(
        `${BASEURL}/client/get_one_client/${clientId}?${params.toString()}`,
        {
          headers: { authorization: localStorage.getItem("usertoken") },
        }
      )
      // handel error if request faild
      .catch((err) => {
        console.log(err);
      });
    console.log(response);
    setClient(response?.data?.data);
  }
  console.log(client);
  useEffect(() => {
    getOneClient(query);
  }, [query]);
  return (
    <section className="home_section ">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar
              menuCollapse={menuCollapse}
              menuIconClick={menuIconClick}
              handleToggleSidebar={handleToggleSidebar}
              menuToggle={menuToggle}
            />
          </div>
          {!menuCollapse ? (
            <div
              className="col-md-10 right__content"
              style={{ transform: "translate(-8%,-1.5%)" }}
            >
              <header>
                <HeaderBox />
              </header>
              {/* <OverFlowBox /> */}
              <ClientDetailsData
              client={client}
                menuCollapse={menuCollapse}
                menuIconClick={menuIconClick}
                handleToggleSidebar={handleToggleSidebar}
                menuToggle={menuToggle}
              />
              <ClientDetailsDataTable
               client={client}
                menuCollapse={menuCollapse}
                menuIconClick={menuIconClick}
                handleToggleSidebar={handleToggleSidebar}
                menuToggle={menuToggle}
              />
            </div>
          ) : (
            <div
              className="col-md-11 right__content"
              style={{ transform: "translate(-2%,-5%)" }}
            >
              <header>
                <HeaderBox
                  menuCollapse={menuCollapse}
                  menuIconClick={menuIconClick}
                  handleToggleSidebar={handleToggleSidebar}
                  menuToggle={menuToggle}
                />
              </header>
              {/* <OverFlowBox /> */}
              <ClientDetailsData
               client={client}
                menuCollapse={menuCollapse}
                menuIconClick={menuIconClick}
                handleToggleSidebar={handleToggleSidebar}
                menuToggle={menuToggle}
              />
              <ClientDetailsDataTable
               client={client}
                menuCollapse={menuCollapse}
                menuIconClick={menuIconClick}
                handleToggleSidebar={handleToggleSidebar}
                menuToggle={menuToggle}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

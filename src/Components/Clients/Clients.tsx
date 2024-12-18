import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import HeaderBox from "../HeaderBox/HeaderBox";
import OverFlowBox from "../OverFlowBox/OverFlowBox";
import DataTable from "../DataTable/DataTable";
export default function Clients() {

  const [menuCollapse, setMenuCollapse] = useState(false);
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const [menuToggle, setMenuToggle] = useState(false);

  const handleToggleSidebar = (value: any) => {
    setMenuToggle(value);
  };
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
              style={{ transform: "translate(-8%,-1%)" }}
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
              <DataTable
                menuCollapse={menuCollapse}
                menuIconClick={menuIconClick}
                handleToggleSidebar={handleToggleSidebar}
                menuToggle={menuToggle}
              />
            </div>
          ) : (
            <div
              className="col-md-11 right__content"
              style={{ transform: "translate(-2%,-3.7%)" }}
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
              <DataTable
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

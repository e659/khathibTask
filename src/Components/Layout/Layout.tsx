import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import HeaderBox from "../HeaderBox/HeaderBox";

import OverFlowBox from "../OverFlowBox/OverFlowBox";
import DataTable from "../DataTable/DataTable";
export default function Layout() {
  // sidebar functions
  // const [menuCollapse, setMenuCollapse] = useState(false);
  // const menuIconClick = () => {
  //   menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  // };
  // const [menuToggle, setMenuToggle] = useState(false);

  // const handleToggleSidebar = (value: any) => {
  //   setMenuToggle(value);
  // };
  return (
    <div>
      <Outlet></Outlet>
    </div>
    // <div className="container-fluid">
    //   <div className="row">
    //     <div className="col-md-2">
    //       <Sidebar
    //         menuCollapse={menuCollapse}
    //         menuIconClick={menuIconClick}
    //         handleToggleSidebar={handleToggleSidebar}
    //         menuToggle={menuToggle}
    //       />
    //     </div>
    //     {!menuCollapse ? (
    //       <div
    //         className="col-md-10 right__content"
    //         style={{ transform: "translate(-7%,-15px)" }}
    //       >
    //         <header>
    //           <HeaderBox
    //             menuCollapse={menuCollapse}
    //             menuIconClick={menuIconClick}
    //             handleToggleSidebar={handleToggleSidebar}
    //             menuToggle={menuToggle}
    //           />
    //         </header>
    //         <Outlet
    //           menuCollapse={menuCollapse}
    //           menuIconClick={menuIconClick}
    //           handleToggleSidebar={handleToggleSidebar}
    //           menuToggle={menuToggle}
    //         />
    //         {/* <OverFlowBox />
    //        <DataTable /> */}
    //       </div>
    //     ) : (
    //       <div
    //         className="col-md-11 right__content"
    //         style={{ transform: "translate(-2%,-50px)" }}
    //       >
    //         <header>
    //           <HeaderBox
    //             menuCollapse={menuCollapse}
    //             menuIconClick={menuIconClick}
    //             handleToggleSidebar={handleToggleSidebar}
    //             menuToggle={menuToggle}
    //           />
    //         </header>
    //         <Outlet
    //           menuCollapse={menuCollapse}
    //           menuIconClick={menuIconClick}
    //           handleToggleSidebar={handleToggleSidebar}
    //           menuToggle={menuToggle}
    //         />
    //         {/* <OverFlowBox /> */}
    //         {/* <DataTable
    //          menuCollapse={menuCollapse}
    //          menuIconClick={menuIconClick}
    //          handleToggleSidebar={handleToggleSidebar}
    //          menuToggle={menuToggle}
    //        /> */}
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}

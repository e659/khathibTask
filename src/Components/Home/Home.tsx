import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import HeaderBox from "../HeaderBox/HeaderBox";
import "./home.scss";
import OverFlowBox from "../OverFlowBox/OverFlowBox";
import DataTable from "../DataTable/DataTable";
import AddNewClient from "../AddNewClient/AddNewClient";
export default function Home() {
  return (
    <section className="home_section ">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 right__content">
            <header>
              <HeaderBox />
            </header>
           
          </div>
        </div>
      </div>
    </section>
  );
}

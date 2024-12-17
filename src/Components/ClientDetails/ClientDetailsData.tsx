import React, { useState, useEffect } from "react";
import { BASEURL } from "../../../constans/index";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./client.scss";
import { InfinitySpin } from "react-loader-spinner";
export default function ClientDetailsData({
  menuCollapse,
  menuIconClick,
  handleToggleSidebar,
  menuToggle,
  client,
}) {
  // console.log(client);
  return (
    <div className="container">
      {menuCollapse ? (
        <>
          {client ? (
            <div className="row bg-white rounded rounded-2 p-4" style={{width:"1350px"}}>
              <div className="col-md-6 mt-3 appeal__div">
                <img
                  src={client?.client_data?.image}
                  alt="client"
                  className=" rounded rounded-circle cilent___detailsImg my-2"
                />
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>{`${
                  client?.client_data?.first_name?.charAt(0).toUpperCase() +
                  client?.client_data?.first_name?.slice(1).toLowerCase()
                } ${
                  client?.client_data?.last_name?.charAt(0).toUpperCase() +
                  client?.client_data?.last_name?.slice(1).toLowerCase()
                }`}</p>
                <p
                  className="mb-0"
                  style={{
                    fontSize: "20px",
                    fontWeight: "400",
                    color: "rgb(128 131 142 )",
                  }}
                >
                  {client?.client_data?.email}
                </p>
                <p
                  className="p-0"
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    color: "rgb(128 131 142 )",
                  }}
                >
                  NUM:
                  {client?.client_data?.phone}
                </p>

                <div className="row">
                  <div className="col-md-6 appeal__div">
                    <p className="fw-bold">0</p>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "normal",
                      }}
                    >
                      Appeal
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="fw-bold">0</p>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "normal",
                      }}
                    >
                      Properties
                    </p>
                  </div>
                  <div className="row">
                    <p className="text-black fw-bold py-3">
                      Total Invoices : 0
                    </p>
                    <div className="col-md-6 appeal__div">
                      <p className="fw-bold">0</p>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "rgb(128 131 142 )",
                          fontWeight: "normal",
                        }}
                      >
                        Payed
                      </p>
                    </div>
                    <div className="col-md-6 ">
                      <p className="fw-bold">0</p>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "rgb(128 131 142 )",
                          fontWeight: "normal",
                        }}
                      >
                        unpayed
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Address
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.address}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      City
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.city}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      State
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.state}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Zip Code
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.zip_code}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Birth Date
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.birth_date}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Start Date
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.start_date}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Annual income
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.annual_income}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Disability Year
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      N/A
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Veteran
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.Veteran.toString()}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Disability
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.disability.toString()}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Verified
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.verified.toString()}
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "18px",
                          color: "rgb(128 131 142 )",
                          fontWeight: "500",
                        }}
                      >
                        Entity Name
                      </p>
                      <p
                        style={{
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        N/A
                      </p>
                    </div>
                    <div className="col-4">
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "18px",
                          color: "rgb(128 131 142 )",
                          fontWeight: "500",
                        }}
                      >
                        Entity Type
                      </p>
                      <p
                        style={{
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        N/A
                      </p>
                    </div>
                    <div className="col-4">
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "18px",
                          color: "rgb(128 131 142 )",
                          fontWeight: "500",
                        }}
                      >
                        Relation Ship
                      </p>
                      <p
                        style={{
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        N/A
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-5"></div> */}
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          {client ? (
            <div className="row bg-white rounded rounded-2 p-4" style={{width:"1200px"}}>
              <div className="col-md-6 mt-3 appeal__div">
                <img
                  src={client?.client_data?.image}
                  alt="client"
                  className=" rounded rounded-circle cilent___detailsImg my-2"
                />
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>{`${
                  client?.client_data?.first_name?.charAt(0).toUpperCase() +
                  client?.client_data?.first_name?.slice(1).toLowerCase()
                } ${
                  client?.client_data?.last_name?.charAt(0).toUpperCase() +
                  client?.client_data?.last_name?.slice(1).toLowerCase()
                }`}</p>
                <p
                  className="mb-0"
                  style={{
                    fontSize: "20px",
                    fontWeight: "400",
                    color: "rgb(128 131 142 )",
                  }}
                >
                  {client?.client_data?.email}
                </p>
                <p
                  className="p-0"
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    color: "rgb(128 131 142 )",
                  }}
                >
                  NUM:
                  {client?.client_data?.phone}
                </p>

                <div className="row">
                  <div className="col-md-6 appeal__div">
                    <p className="fw-bold">0</p>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "normal",
                      }}
                    >
                      Appeal
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="fw-bold">0</p>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "normal",
                      }}
                    >
                      Properties
                    </p>
                  </div>
                  <div className="row">
                    <p className="text-black fw-bold py-3">
                      Total Invoices : 0
                    </p>
                    <div className="col-md-6 appeal__div">
                      <p className="fw-bold">0</p>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "rgb(128 131 142 )",
                          fontWeight: "normal",
                        }}
                      >
                        Payed
                      </p>
                    </div>
                    <div className="col-md-6 ">
                      <p className="fw-bold">0</p>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "rgb(128 131 142 )",
                          fontWeight: "normal",
                        }}
                      >
                        unpayed
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Address
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.address}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      City
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.city}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      State
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.state}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Zip Code
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.zip_code}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Birth Date
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.birth_date}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Start Date
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.start_date}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Annual income
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.annual_income}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Disability Year
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      N/A
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Veteran
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.Veteran.toString()}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Disability
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.disability.toString()}
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "18px",
                        color: "rgb(128 131 142 )",
                        fontWeight: "500",
                      }}
                    >
                      Verified
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {client?.client_data?.verified.toString()}
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "18px",
                          color: "rgb(128 131 142 )",
                          fontWeight: "500",
                        }}
                      >
                        Entity Name
                      </p>
                      <p
                        style={{
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        N/A
                      </p>
                    </div>
                    <div className="col-4">
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "18px",
                          color: "rgb(128 131 142 )",
                          fontWeight: "500",
                        }}
                      >
                        Entity Type
                      </p>
                      <p
                        style={{
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        N/A
                      </p>
                    </div>
                    <div className="col-4">
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "18px",
                          color: "rgb(128 131 142 )",
                          fontWeight: "500",
                        }}
                      >
                        Relation Ship
                      </p>
                      <p
                        style={{
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        N/A
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-5"></div> */}
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

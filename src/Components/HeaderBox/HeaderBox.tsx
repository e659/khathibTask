import React, { useState, useContext } from "react";
import {  useLocation } from 'react-router-dom';
import mail from "../../assets/images/headerBox/Mail.png";
import bill from "../../assets/images/headerBox/Bell.png";
import profile from "../../assets/images/headerBox/Ellipse 6.png";
import "./headerbox.scss";
import { userContext } from "../Context/userContext.jsx";
export default function HeaderBox({
  menuCollapse,
  menuIconClick,
  handleToggleSidebar,
  menuToggle,
}) {
  const { userData } = useContext(userContext);
  const location = useLocation();
  const pathname = location.pathname.split('/'); // Get the current path

  return (
    <div>
      {menuCollapse ? (
        <div className=" d-flex justify-content-between  headerbox" style={{width:"1370px"}}>
          <div>
            <p className="fw-bold fs-4 ms-2">Clients</p>
          </div>

          {userData ? (
            <div className=" d-flex align-items-center">
              <div className="">
                <img src={profile} alt="mail" className="header__imgprofile" />
              </div>
              <div className="footer___userBox">
                <h4 className="">{`${
                  userData.first_name.charAt(0).toUpperCase() +
                  userData.first_name.slice(1).toLowerCase()
                } ${
                  userData.last_name.charAt(0).toUpperCase() +
                  userData.last_name.slice(1).toLowerCase()
                }`}</h4>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-between  headerbox">
          <div>
            <p className="fw-bold fs-4 ms-2">{pathname[1]}</p>
          </div>

          {userData ? (
            <div className=" d-flex align-items-center">
              <div className="">
                <img src={profile} alt="mail" className="header__imgprofile" />
              </div>
              <div className="footer___userBox">
                <h4 className="">{`${
                  userData.first_name.charAt(0).toUpperCase() +
                  userData.first_name.slice(1).toLowerCase()
                } ${
                  userData.last_name.charAt(0).toUpperCase() +
                  userData.last_name.slice(1).toLowerCase()
                }`}</h4>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      {/* <div className="d-flex justify-content-between  headerbox" >
          <div>
            <p className="fw-bold fs-4 ms-2">Client</p>
          </div>

          {userData ? (
            <div className=" d-flex align-items-center">
              <div className="">
                <img src={profile} alt="mail" className="header__imgprofile" />
              </div>
              <div className="footer___userBox">
                <h4 className="">{`${
                  userData.first_name.charAt(0).toUpperCase() +
                  userData.first_name.slice(1).toLowerCase()
                } ${
                  userData.last_name.charAt(0).toUpperCase() +
                  userData.last_name.slice(1).toLowerCase()
                }`}</h4>
              </div>
            </div>
          ) : (
            ""
          )}
        </div> */}
    </div>
  );
}
